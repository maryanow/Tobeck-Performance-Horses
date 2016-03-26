'use strict';

/**
 * Module dependencies.
 */
var glob = require('glob');

/**
 * Module init function.
 */
module.exports = function() {
	var environmentFiles = glob('./config/env/all.js', {sync: true});
};
