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
    header: {
        image: {
            type: String,
            trim: false,
            default: 'modules/core/img/logo'
        },
        position: {
            type: Number,
            min: 0,
            max: 100
        },
        darkened: {
            type: Number,
            min: 0,
            max: 1
        },
        heading: {
            type: String,
            trim: true,
            default: 'Tobeck Performance Horses'
        },
        subheading: {
            type: String,
            trim: true,
            default: ''
        }
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
        }
    }]
});

mongoose.model('Page', PageSchema);