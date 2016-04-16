'use strict';

angular.module('core').directive('articleBody', function() {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: '/modules/core/views/templates/article-body.client.template.html'
    }
});