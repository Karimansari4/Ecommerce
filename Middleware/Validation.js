const { body, validationResult } = require("express-validator");

module.exports.registerValidation = [
    body("name").not().isEmpty().withMessage("Name is required!"),
    body("email").not().isEmpty().withMessage("Email is required!"),
    body("password").isLength({min:5}).withMessage("Password must be 5 characters long"),
];