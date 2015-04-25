    (function() {
        'use strict';
        var graphDirective = angular.module('graphDirective', []);

        graphDirective.directive('graphLine', ['socket',
            function(socket) {
                return {
                    restrict: 'E',
                    replace: true,
                    scope: {
                        data: '='
                    },
                    link: function(scope, element, attrs) {
                         function render() {
                            if(scope.data) {
                                element.empty();
                                console.log("Enter here");
                                var margin = {top: 20, right: 80, bottom: 30, left: 150},
                                    width = 960 - margin.left - margin.right,
                                    height = 500 - margin.top - margin.bottom;


                                var x = d3.time.scale()
                                    .range([0, width]);

                                var y = d3.scale.linear()
                                    .range([height, 0]);

                                var color = d3.scale.category10();

                                var posts;


                                var xAxis = d3.svg.axis()
                                    .scale(x)
                                    .orient("bottom");

                                var yAxis = d3.svg.axis()
                                    .scale(y)
                                    .orient("left");

                                var line = d3.svg.line()
                                    .interpolate("basis")
                                    .x(function(d) { return x(d.date); })
                                    .y(function(d) { return y(d.value); });

                                var svg = d3.select(element[0]).append("svg")
                                    .attr("width", width + margin.left + margin.right)
                                    .attr("height", height + margin.top + margin.bottom)
                                  .append("g")
                                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                                var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;
                                var data = scope.data;

                                var parseData = {"post_impressions" : [],
                                                "post_impressions_organic" : [],
                                                "post_impressions_paid" : [],
                                                "post_impressions_viral" : []};
                                var resultArray = [];
                                data.forEach(function(element) {
                                    d3.keys(element).forEach(function(d){
                                        resultArray.push({key: d,date:element[d][0].timestamp,
                                                           value :element[d][0].value});
                                    });
                                });

                                posts = d3.nest()
                                    .key(function(d) {return d.key;})
                                    .key(function(d) {return d.date;}).sortKeys(d3.ascending)
                                    .entries(resultArray);
                                posts.forEach(function(s) {
                                    s.values.forEach(function(d) {
                                        d.sumValues = d3.sum(d.values, function(d){return d.value; });
                                    });
                                });
                                var dateArray = [];
                                posts.forEach(function(s) {
                                    var index = 0;
                                    s.values.forEach(function(d) {
                                        if(dateArray[index] === undefined) {
                                            dateArray[index] = {date:parseDate(d.key)};
                                        }
                                        index++;
                                        d.date = parseDate(d.key); d.value = +d.sumValues;
                                    });

                                    s.maxValue = d3.max(s.values, function(d) { return d.value; });
                                    s.sumValue = d3.sum(s.values, function(d) { return d.value; });
                                });
                                x.domain(d3.extent(dateArray, function(d) { return d.date; }));
                                y.domain([
                                    d3.min(posts, function(d) { return d3.min(d.values, function(v) { return v.value; })}),
                                    d3.max(posts, function(d) { return d3.max(d.values, function(v) { return v.value; })})
                                ]);


                                svg.append("g")
                                      .attr("class", "x axis")
                                      .attr("transform", "translate(0," + height + ")")
                                      .call(xAxis);

                                svg.append("g")
                                      .attr("class", "y axis")
                                      .call(yAxis)
                                    .append("text")
                                      .attr("transform", "rotate(-90)")
                                      .attr("y", 6)
                                      .attr("dy", ".71em")
                                      .style("text-anchor", "end")
                                      .text("Number post");

                                 var post = svg.selectAll(".post")
                                      .data(posts)
                                    .enter().append("g")
                                      .attr("class", "post");

                                post.append("path")
                                      .attr("class", "line")
                                      .attr("d", function(d) { return line(d.values); })
                                      .style("stroke", function(d) { return color(d.key); });


                                post.append("text")
                                  .datum(function(d) { return {name: d.key, value: d.values[d.values.length - 1]}; })
                                  .attr("transform", function(d) {
                                      return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")";
                                  })

                                  var legend = svg.selectAll(".legend")
                                      .data(color.domain())
                                    .enter().append("g")
                                      .attr("class", "legend")
                                      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
                                  legend.append("rect")
                                      .attr("x", width - 18)
                                      .attr("width", 18)
                                      .attr("height", 18)
                                      .style("fill", color);
                                  legend.append("text")
                                      .attr("x", width - 24)
                                      .attr("y", 9)
                                      .attr("dy", ".35em")
                                      .style("text-anchor", "end")
                                      .text(function(d) {return d; });
                            }

                        }



                        if (scope.data) {
                            render();
                        }

                        socket.on('newGraphValue', function (data) {
                            scope.data = data;
                        });
                        scope.$watch('data', render, true);

                    }
                };
            }])
    })();
