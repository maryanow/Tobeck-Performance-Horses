'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', '$http', 'Authentication', '$sce',
	function($scope, $location, $http, Authentication, $sce) {
        $scope.authentication = Authentication;

        $scope.editing = false;

        $http.get('/pages/home').success(function(data) {
            delete $scope.error;
            $scope.page = data;
        }).error(function(err) {
            $scope.error = err.message;
            $scope.page = null;
        });

        $scope.editPage = function() {
            $scope.editing = true;
        }

        $scope.cancelEdit = function() {
            $scope.editing = false;
        }

        $scope.savePage = function() {
            $http.post('/pages/save', $scope.page).success(function() {
                delete $scope.error;
            }).error(function(response) {
                $scope.error = response.message;
            });

            $scope.editing = false;
        }

        /*
        *   Transform URL into trusted URL for iframe/img use.
        */
        $scope.getResource = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.addItem = function(index, _desc) {
            $scope.page.data.splice(index + 1, 0, {desc: _desc, value: ''});
        }

        $scope.removeItem = function(item) {
            $scope.page.data.splice($scope.page.data.indexOf(item), 1);
        }
	}
]);
