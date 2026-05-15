const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateRegisterUser } = require("../models/User");

/**---------------------------------------------------------
 * @desc       register new user
 * @router     api/auth/register
 * @method     Post
 * @access     public
 -----------------------------------------------------------*/
module.exports.registerUserController = asyncHandler(async (req, res) => {
    // 1. Validation
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // 2. Is user already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: "User already exist" });
    }
    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // 4. Create user and save it to DB
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    await user.save();
    // 5. Send response to the client
    res.status(200).json({ message: "You registered successfully, please log in" });
})