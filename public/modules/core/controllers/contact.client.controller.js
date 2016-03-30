'use strict';

angular.module('core').controller('ContactController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
    }
]);
