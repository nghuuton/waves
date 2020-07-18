const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bcrypt = require("bcrypt");

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

// Middleware
const { auth } = require("./middleware/auth");

// Models
const User = require("./models/user");

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
