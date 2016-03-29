'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('news', {
			url: '/news',
			templateUrl: 'modules/core/views/news.client.view.html'
		})
		.state('facilities', {
			url: '/facilities',
			templateUrl: 'modules/core/views/facilities.client.view.html'
		})
		.state('sales', {
			url: '/sales',
			templateUrl: 'modules/core/views/sales.client.view.html'
		})
		.state('services', {
			url: '/services',
			templateUrl: 'modules/core/views/services.client.view.html'
		})
		.state('trainers', {
			url: '/trainers',
			templateUrl: 'modules/core/views/trainers.client.view.html'
		});
	}
]);
