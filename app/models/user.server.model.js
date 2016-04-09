'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * Admin Schema
 */
var AdminSchema = new Schema({
    email: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    provider: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Hook a pre save method to hash the password
 */
AdminSchema.pre('save', function(next) {
    if (!this.skipHash && this.password && this.password.length >= 6) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
AdminSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
AdminSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

mongoose.model('Admin', AdminSchema);