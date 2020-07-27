const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const async = require("async");
// const bcrypt = require("bcrypt");

const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => {
        console.log("Connection Database !!!");
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Middleware
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");
// Models
const User = require("./models/user");
const Brand = require("./models/brand");
const Wood = require("./models/wood");
const Product = require("./models/product");
const Payment = require("./models/payment");
// Product

app.post("/api/product/shop", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    findArgs["publish"] = true;

    Product.find(findArgs)
        .populate("brand")
        .populate("wood")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).json({ err });
            res.status(200).json({
                size: articles.length,
                articles,
            });
        });
});

app.post("/api/product/article", auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
            success: true,
            article: doc,
        });
    });
});

app.get("/api/product/article_by_id", async (req, res) => {
    let type = req.query.type;
    let items = req.query.id;
    if (type === "array") {
        let ids = req.query.id.split(",");
        items = [];
        items = ids.map((item) => {
            return mongoose.Types.ObjectId(item);
        });
    }
    try {
        const product = await Product.find({ _id: { $in: items } })
            .populate("brand", "name")
            .populate("wood", "name");
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.get("/api/product/articles", async (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? req.query.limit : 100;
    try {
        const products = await Product.find()
            .populate("brand")
            .populate("wood")
            .sort([[sortBy, order]])
            .limit(Number(limit));
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(400).send(error);
    }
});

// Woods
app.post("/api/product/wood", auth, admin, async (req, res) => {
    try {
        const wood = new Wood(req.body);
        await wood.save();
        return res.status(201).json({ success: true, wood });
    } catch (error) {
        return res.status(400).json({ success: false });
    }
});

app.get("/api/product/woods", async (req, res) => {
    try {
        const woods = await Wood.find({});
        return res.status(200).json({ woods });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// Brand
app.post("/api/product/brand", auth, admin, async (req, res) => {
    try {
        const brand = new Brand(req.body);
        await brand.save();
        return res.status(201).json({ success: true, brand });
    } catch (error) {
        return res.status(404).json({ success: fase, error });
    }
});

app.get("/api/product/brands", async (req, res) => {
    try {
        const brands = await Brand.find({});
        return res.status(200).json({ brands });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// User

app.get("/api/user/auth", auth, (req, res) => {
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history,
    });
});

app.post("/api/user/register", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(404).json({ success: false, error });
    }
});

app.post("/api/user/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(404).json({
            loginSuccess: false,
            message: "Auth failed, email not found",
        });
    user.comparePassword(req.body.password, (err, result) => {
        if (!result)
            return res.json({
                loginSuccess: false,
                message: "Wrong password",
            });
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("w_auth", user.token).status(200).json({
                loginSuccess: true,
            });
        });
    });
});

app.get("/api/user/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        res.clearCookie("w_auth");
        return res.status(200).send({ success: true });
    });
});

app.post("/api/user/uploadimage", auth, admin, formidable(), (req, res) => {
    cloudinary.uploader.upload(
        req.files.file.path,
        (result) => {
            console.log(result);
            res.status(200).send({
                public_id: result.public_id,
                url: result.url,
            });
        },
        {
            public_id: `${Date.now()}`,
            resource_type: "auto",
        }
    );
});

app.get("/api/user/removeimage", auth, admin, (req, res) => {
    let image_id = req.query.public_id;
    cloudinary.uploader.destroy(image_id, (err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).send("ok");
    });
});

app.post("/api/user/add-to-cart", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        let duplicate = false;
        user.cart.forEach((item) => {
            if (item._id == req.body._id) {
                duplicate = true;
            }
        });
        // console.log(duplicate);
        if (duplicate) {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart._id": mongoose.Types.ObjectId(req.body._id) },
                {
                    $inc: {
                        "cart.$.quantity": 1,
                    },
                },
                { new: true }
            );
            return res.status(200).json(user.cart);
        } else {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            _id: mongoose.Types.ObjectId(req.body._id),
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true }
            );
            return res.status(200).json(user.cart);
        }
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.post("/api/user/remove-from-cart", auth, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $pull: {
                    cart: {
                        _id: mongoose.Types.ObjectId(req.body._id),
                    },
                },
            },
            { new: true }
        );
        let cart = user.cart;
        let array = cart.map((item) => {
            return mongoose.Types.ObjectId(item._id);
        });

        const cartDetail = await Product.find({ _id: { $in: array } })
            .populate("wood")
            .populate("brand");

        return res.status(200).json({ cart, cartDetail });
    } catch (error) {
        return res.status(400).send(error);
    }
});

app.post("/api/user/success-buy", auth, async (req, res) => {
    let history = [];
    let transactionData = {};
    // user history
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID,
        });
    });
    // payment dash
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email,
    };
    transactionData.data = req.body.paymentData;
    transactionData.product = history;
    // console.log(transactionData);
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { history: history }, $set: { cart: [] } },
            { new: true }
        );
        const payment = new Payment(transactionData);
        // console.log(payment);
        await payment.save();
        let products = [];
        payment.product.forEach((item) => {
            products.push({ id: item.id, quantity: item.quantity });
        });
        console.log(products);
        async.eachSeries(
            products,
            (item, callback) => {
                Product.update(
                    { _id: item.id },
                    { $inc: { sold: item.quantity } },
                    { new: false },
                    callback
                );
            },
            (err) => {
                if (err) return res.json({ success: false, err });
                res.status(200).json({
                    success: true,
                    cart: user.cart,
                    cartDetail: [],
                });
            }
        );
    } catch (error) {
        return res.status(400).json({ success: false, error });
    }
});

// app.post("/check", async (req, res) => {
//     const user = await User.findOne({
//         email: req.body.email,
//     });
//     const password = user.password;
//     const checkPassword = bcrypt.compare(req.body.password, password, function (
//         err,
//         result
//     ) {
//         if (err) return res.status(404).json({ success: false });
//         res.status(200).json({ success: result });
//     });
// });

// app.get("/", function (req, res) {
//     res.cookie("name", "express").send("cookie set");
//     console.log(req.cookies);
// });

// app.get("/clear", (req, res) => {
//     res.clearCookie("name");
//     console.log(req.cookies);
//     res.send("Clear cookie");
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Sever is start on", PORT);
});

module.exports = app;
