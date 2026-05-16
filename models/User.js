const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlingth: 100
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlingth: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlenght: 8,
    },
    profilePhoto: {
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

// Generate token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET);
}

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

// Validate login user
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().required().min(5).max(100).email(),
        password: Joi.string().trim().min(8).required()
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser
}