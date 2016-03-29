'use strict';

angular.module('core').controller('ServicesController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
    }
]);
