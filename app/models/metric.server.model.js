'use strict';

/*
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
 * Metrics Schema
 */
var MetricsSchema = new Schema({
    page: {
        type: String,
        trim: true,
        default: ''
    },
    visits: {
        type: Number,
        default: 0
    }
});

mongoose.model('Metric', MetricsSchema);