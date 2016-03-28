'use strict';

angular.module('core').controller('HomeController', ['$scope', '$location', '$http', 'Authentication', '$sce',
	function($scope, $location, $http, Authentication, $sce) {
        var numPosts = 3;

        $scope.authentication = Authentication;

        $scope.posts = null;
        $scope.startIndex = 0;
        $scope.endIndex = numPosts - 1;

        $scope.newPost = {
            title:'',
            data:[]
        }

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
            $http.delete('/posts/' + post._id).success(function() {
                delete $scope.error;

                $scope.posts.splice($scope.posts.indexOf(post), 1);

                if ($scope.endIndex >= $scope.posts.length) {
                    $scope.endIndex = $scope.posts.length - 1;
                }

                if ($scope.endIndex < $scope.startIndex) {
                    $scope.previousPage();
                }
            }).error(function(response) {
                $scope.error = response.message;
            });
        }

        /*
        *   Begin editing state of individual post.
        *   Cancel any other edits.
        */
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

        /*
        *   Call to backend to update database with
        *    new information.
        */
        $scope.savePost = function(post) {
            $http.post('/posts/save', post).success(function() {
                delete $scope.error;

                post.editing = false;
            }).error(function(response) {
                $scope.error = response.message;
            });
        }

        $scope.addPost = function() {
            $http.post('/posts', $scope.newPost).success(function(post) {
                delete $scope.error;

                console.log(post)

                $scope.posts.splice(0, 0, $scope.newPost);
                $scope.newPost = {};
            }).error(function(response) {
                $scope.error = response.message;
            })
        }

        $scope.removeItem = function(post, item) {
            post.data.splice(post.data.indexOf(item), 1);
        }

        $scope.addItem = function(post, index, _desc) {
            post.data.splice(index + 1, 0, {desc: _desc, value: ''});
        }
	}
]);
