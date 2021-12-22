;(() => {
    'use strict';

    /**
     * Include config
     */
    const config = require('config');

    /**
     * Code - decode tokens
     */
    const jwt = require('jsonwebtoken');

    /**
     * Exporting Auth middleware function
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    module.exports = (req, res, next) => {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1]; // "Bearer ... TOKEN"

            if (!token) {
                return res.status(401).json({ message: 'Not Authorised.' });
            }

            const decodedToken = jwt.verify(token, config.get('jwtSecret'));

            req.userDecoded = decodedToken;

            next();
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };
})();