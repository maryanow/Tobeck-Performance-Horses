'use strict';

angular.module('core').controller('FooterController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
    }
]);
