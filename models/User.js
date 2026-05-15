const mongoose = require("mongoose");
const Joi = require("joi");

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
            url: "https://pixabay.com/vectors/user-icon-person-personal-about-me-2935527/",
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

// Validete register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).email().required(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser
}