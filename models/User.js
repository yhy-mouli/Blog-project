const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlenght: 2,
        maxlinght: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 5,
        maxlinght: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: 8,
    },
    profilePhote: {
        type: Object,
        default: {
            url: "https://cdn.pixabay.com/photo/2014/03/25/15/23/user-296688_1280.png",
            publicId: null,
        },
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

// User Model
const User = mongoose.model("User", userSchema);

module.exports = {
    User
}