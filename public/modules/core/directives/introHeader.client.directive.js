'use strict';

angular.module('core').directive('introHeader', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/modules/core/views/templates/intro-header.client.template.html'
    }
});