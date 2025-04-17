const mongoose = require("mongoose");

const foodSchema = new mongoose1.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        default: 0,  // or null
    },
    isAvailable:{
        type: Boolean,
        default: true,
    },

    restaurantId:{
        type: mongoose1.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    }

}, {    timestamps: true });

const Food = mongoose1.model("Food", foodSchema);
export default Food;
