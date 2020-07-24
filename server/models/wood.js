const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const woodSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: 1,
        maxlength: 100,
    },
});

const Wood = mongoose.model("Wood", woodSchema);

module.exports = Wood;
