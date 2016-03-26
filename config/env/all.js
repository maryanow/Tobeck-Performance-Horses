'use strict';

module.exports = {
	app: {
		title: "Tobeck Performance Horses",
		description: "Tobeck Performance Horses, Horse Training",
		keywords: 'horse, training, performance, equestrian'
	},
	db: 'mongodb://localhost/Training',
	port: 4000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [ ],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/ace-builds/src-min-noconflict/ace.js',
				'public/lib/angular-ui-ace/ui-ace.js'
			]
		},
		css: [
			'public/dist/application.min.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
