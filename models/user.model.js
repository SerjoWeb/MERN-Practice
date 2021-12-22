;(() => {
    'use strict';

    /**
     * Required necessary options
     */
    const { Schema, model, Types } = require('mongoose');

    /**
     * Create new model - schema
     */
    const schema = new Schema({
        name: {
            type: String,
        },
        login: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        posts: [{
            type: Types.ObjectId,
            ref: 'Post'
        }]
    });

    /**
     * Export model User and schema
     */
    module.exports = model('User', schema);
})();