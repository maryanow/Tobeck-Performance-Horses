'use strict';

/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 * Post Schema
 */
var PageSchema = new Schema({
    title: {
        type: String,
        trim: true,
        default: '',
        match: [/.+/, 'Please fill in a title.']
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
            default: ''
        },
        classes: {
            type: String,
            trim: false,
            default: ''
        }
    }]
});

mongoose.model('Page', PageSchema);