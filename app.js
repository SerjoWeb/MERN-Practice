;(() => {
    'use strict';

    /**
     * Required necessary options
     */
    const express = require('express');
    const config = require('config');
    const mongoose = require('mongoose');

    /**
     * Init express & start server
     */
    const app = express();

    /**
     * Middleware for correct http body data
     */
     app.use(express.json({ extended: true }));

    /**
     * Add and init Routes
     */
    app.use('/api/auth', require('./routes/auth.route'));
    app.use('/api/post', require('./routes/post.route'));

    /**
     * Set PORT from config
     */
    const PORT = config.get('port');

    /**
     * Async function start to connect to MongoDB
     */
    const start = async () => {
        try {
            await mongoose.connect(config.get("mongoURI"), {});

            app.listen(PORT, () => { console.info(`server runs on ${PORT}`) });
        } catch (e) {
            console.error('Server error', e.message);
            process.exit(1);
        }
    };

    /**
     * Init function start
     */
    start();
})();