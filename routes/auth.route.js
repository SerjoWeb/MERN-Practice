;(() => {
    "use strict";

    /**
     * Required necessary options
     */
    const config = require("config");
    const { Router } = require("express");
    const bcrypt = require("bcryptjs");
    const { check, validationResult } = require("express-validator");
    const jwt = require("jsonwebtoken");

    /**
     * Required models
     */
     const User = require("../models/user.model");

    /**
     * Init router
     */
    const router = Router();

    /**
     * Setting up router post request - register
     * /api/auth/register
     */
    router.post(
        "/register", 
        [
            check("login", "Invalid login.").isEmail(),
            check("password", "Minimun password characters is 6 symbols.").isLength({min: 6})
        ], 
        async (req, res) => {

        try {
            /**
             * Valid errors
             */
             const errors = validationResult(req);

             if (!errors.isEmpty()) {
                 return res.status(400).json({
                     errors: errors.array(),
                     message: "Incorrect data during registration."
                 });
             }

             /**
              * get data from request
              */
             const { login, password } = req.body;

             /**
              * Check if login is unique
              */
             const user = await User.findOne({ login: login });

             if (user) {
                 return res.status(400).json({message: "User is already exists."});
             }

             /**
              * Hash password
              */
             const hashPassword = await bcrypt.hash(password, 12);

             /**
              * New User & save data
              */
             const newUser = new User({
                 login: login,
                 password: hashPassword
             });

             await newUser.save();

             res.status(201).json({message: "User successfully created."});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

    /**
     * Setting up router post request - login
     * /api/auth/login
     */
     router.post(
        "/login", 
        [
            check("login", "Invalid login.").normalizeEmail().isEmail(),
            check("password", "Password is required field.").exists()
        ],
        async (req, res) => {

        try {
            /**
             * Valid errors
             */
             const errors = validationResult(req);

             if (!errors.isEmpty()) {
                 return res.status(400).json({
                     errors: errors.array(),
                     message: "Incorrect data during login functionality."
                 });
             }

             /**
              * get data from request
              */
              const { login, password } = req.body;

              /**
              * Check if login is exist
              */
             const user = await User.findOne({ login: login });

             if (!user) {
                 return res.status(400).json({message: "User doesn\"t  exist."});
             }

             /**
              * Check user data
              */
             const isMatch = await bcrypt.compare(password, user.password);

             if (!isMatch) {
                 return res.status(400).json({message: "Login or/and password is/are not matching."});
             }

             /**
              * Generate token for auth
              */
             const token = jwt.sign(
                 { userId: user.id },
                 config.get("jwtSecret"),
                 { expiresIn: "1h" }
             );

             res.status(200).json({
                 token: token,
                 userId: user.id
             });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

    /**
     * export module router
     */
    module.exports = router;
})();