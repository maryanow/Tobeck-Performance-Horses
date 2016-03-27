'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', '$http', '$sce',
	function($scope, $location, $http, $sce) {
        var numPosts = 3;

        $scope.posts = null;
        $scope.startIndex = 0;
        $scope.endIndex = numPosts - 1;

        $http.get('/posts').success(function(data) {
            delete $scope.error;
            $scope.posts = data;
        }).error(function(err) {
            $scope.posts = null;
            $scope.error = err.message;
        })

        /*
        *   Transform URL into trusted URL for iframe use.
        */
        $scope.getResource = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        /*
        *   Display the 'numPosts' after current;
        *   Update endIndex to not go beyond length of $posts.
        */  
        $scope.nextPage = function() {
            $scope.startIndex += numPosts;
            $scope.endIndex += numPosts;

            if ($scope.endIndex >= $scope.posts.length) {
                $scope.endIndex = $scope.posts.length - 1;
            }
        }

        /*
        *   Display the 'numPosts' before the current;
        *   Update endIndex to be the correct number more than
        *    startIndex. 
        */
        $scope.previousPage = function() {
            $scope.startIndex -= numPosts;
            $scope.endIndex = $scope.startIndex + (numPosts - 1);
        }

        /*
        *   Remove post from $scope to update view.
        *   Check for endIndex beyond length so it doesn't attempt 
        *    to display more than possible.
        *   If nothing in the index range can be displayed, go to 
        *    previous page.
        */  
        $scope.removePost = function(post) {
            //$http.delete(...);

            $scope.posts.splice($scope.posts.indexOf(post), 1);

            if ($scope.endIndex >= $scope.posts.length) {
                $scope.endIndex = $scope.posts.length - 1;
            }

            if ($scope.endIndex < $scope.startIndex) {
                $scope.previousPage();
            }
        }

        $scope.editPost = function(post) {
            post.editing = true;

            for (var i = 0; i < $scope.posts.length; i++) {
                if ($scope.posts[i] !== post) {
                    $scope.cancelEdit($scope.posts[i]);
                }
            }
        }

        $scope.cancelEdit = function(post) {
            post.editing = false;
        }

        $scope.savePost = function(post) {
            post.editing = false;

            //$http.post(...);
        }
	}
]);
