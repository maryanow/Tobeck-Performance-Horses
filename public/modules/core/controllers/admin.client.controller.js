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
                data[i].page = data[i].page[0].toUpperCase() + data[i].page.substring(1);
            }

            delete $scope.error;

            var width = 410,
            height = 410;

            var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                    .range([height, 0]);

            var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient('bottom');

            var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient('left')
                        .ticks(10);

            var svg = d3.select('.svg-container')
                        .append('svg')
                        .style('display', 'block')
                        .style('margin', 'auto')
                        .attr('width', width + 40)
                        .attr('height', height + 40)
                        .append('g')
                        .attr('transform', 'translate(20, 20)');

            x.domain($scope.metrics.map(function(d) {return d.page}));
            y.domain([0, d3.max($scope.metrics, function(d) {return d.visits})]);

            svg.append('g')
               .attr('class', 'x axis')
               .attr('transform', 'translate(0, ' + height + ')')
               .call(xAxis);

            svg.append('g')
               .attr('class', 'y axis')
               .call(yAxis)
               .append('text')
               .attr('transform', 'rotate(-90)')
               .attr('y', 6)
               .attr('dy', '.71em')
               .style('text-anchor', 'end')
               .text('Visits');

            var bar = svg.selectAll('.bar')
               .data($scope.metrics)
               .enter()
               .append('g');
               
            bar.append('rect')
               .attr('class', 'bar')
               .attr('x', function(d) {return x(d.page)})
               .attr('width', x.rangeBand())
               .attr('y', function(d) {return y(d.visits)})
               .attr('height', function(d) {return height - y(d.visits)});

            bar.append('text')
               .attr('x', function(d) {return x(d.page)})
               .attr('y', function(d) {return height - (height - y(d.visits)) + 15})
               .text(function(d) {return d.visits});

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
