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
        title: {
            type: String,
            required: true
        },
        context: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        views: {
            type: Number,
            default: 0
        },
        user: {
            type: Types.ObjectId,
            ref: 'User'
        }
    });

    /**
     * Export model User and schema
     */
    module.exports = model('Post', schema);
})();