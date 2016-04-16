'use strict';

angular.module('core').controller('AdminController', ['$scope', '$location', '$http', 'Authentication',
    function($scope, $location, $http, Authentication) {
        $scope.authentication = Authentication;
        $scope.credentials = {};
        $scope.totalViews = 0;

        $http.get('/metrics').success(function(data) {
            $scope.metrics = data;

            for (var i in data) {
                $scope.totalViews += parseInt(data[i].visits);
            }

            delete $scope.error;
        }).error(function(error) {
            $scope.error = error.message;
        });

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                $scope.authentication.user = response;
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });

            $scope.credentials = {};
        }
    }
]);
