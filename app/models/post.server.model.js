'use strict';

/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 * Post Schema
 */
var PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: '',
        match: [/.+/, 'Please fill in a title.']
    },
    subtitle: {
        type: String,
        trim: true,
        default: ''
    },
    data: [{
        desc: {
            type: String,
            trim: true,
            default: 'text'
        },
        value: {
            type: String,
            trim: false,
            default: '',
            match: [/.+/, 'Please fill in the body of the post.']
        }
    }],
    updated: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Post', PostSchema);