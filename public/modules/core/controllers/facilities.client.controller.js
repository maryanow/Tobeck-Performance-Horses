'use strict';

angular.module('core').controller('FacilitiesController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
    }
]);
