'use strict';

angular.module('core').controller('AboutController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
    }
]);
