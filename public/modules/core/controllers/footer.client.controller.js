'use strict';

angular.module('core').controller('FooterController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
        $scope.credentials = {};

        $scope.signin = function() {
            if ($scope.credentials.email) {
                $scope.credentials.email = $scope.credentials.email.toLowerCase();
            }

            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                $scope.authentication.user = response;
                delete $scope.error;
            }).error(function(response) {
                $scope.error = response.message;
            });

            $scope.credentials = {};
        }
    }
]);
