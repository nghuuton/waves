const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    featured: {
        required: true,
        type: Array,
        default: [],
    },
    siteNfo: {
        required: true,
        type: Array,
        default: [],
    },
});

const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
