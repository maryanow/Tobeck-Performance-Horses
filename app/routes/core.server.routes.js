'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');

	app.route('/').get(core.index);
    
    app.route('/posts').get(core.getPosts);
    app.route('/posts').post(core.addPost);
    app.route('/posts/:id').delete(core.removePost);
    app.route('/posts/save').post(core.savePost);

    app.route('/pages/:page').get(core.getPage);
    app.route('/pages/save').post(core.savePage);

    app.route('/pages/add').post(core.addPage);
};
