const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    name: {
        type: String,
        required: true,
        maxlength: 100,
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100,
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    role: {
        type: Number,
        default: 0,
    },
    token: {
        type: String,
    },
});

userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    // console.log(candidatePassword, this.password);
    bcrypt.compare(candidatePassword, this.password, function (err, result) {
        if (err) return cb(err);
        cb(null, result);
    });
};

userSchema.methods.generateToken = async function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    const UserToken = await user.save();
    if (UserToken) return cb(null, UserToken);
};

userSchema.statics.findByToken = async function (token, cb) {
    var user = this;
    try {
        const decode = await jwt.verify(token, process.env.SECRET);
        const result = await user.findOne({ _id: decode, token: token });
        if (result) return cb(null, result);
    } catch (error) {
        return cb(error);
    }
    // jwt.verify(token, process.env.SECRET, function (err, decode) {
    //     user.findOne({ _id: decode, token: token }, function (err, user) {
    //         if (err) return cb(err);
    //         cb(null, user);
    //     });
    // });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
