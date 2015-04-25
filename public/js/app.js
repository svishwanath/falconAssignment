(function() {
    'use strict';

    /* App Module **/

    var falconTest = angular.module('falconTest',[
        'ngRoute',
        'falconTestControllers',
        'graphDirective'
    ]);

    falconTest.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/publishing', {
                    templateUrl: 'partials/publish-list',
                    controller: 'PublishListCtrl'
                }).
                when('/publishing/create/', {
                    templateUrl: 'partials/publish-form',
                    controller: 'PublishCreateCtrl'
                }).
                when('/publishing/:publishId', {
                    templateUrl: 'partials/publish-details',
                    controller: 'PublishDetailCtrl'
                }).
                when('/publishing/update/:publishId', {
                    templateUrl: 'partials/publish-form',
                    controller: 'PublishUpdateCtrl'
                }).
                when('/reachGraph', {
                    templateUrl: 'partials/reach-graph',
                    controller: 'ReachGraphCtrl'
                }).
                otherwise({
                    redirectTo: '/publishing'
                });
        }
    ]);

    falconTest.factory('socket',['$rootScope',
        function ($rootScope) {
          var socket = io.connect('http://localhost:3000');
          return {
            on: function (eventName, callback) {
              socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  callback.apply(socket, args);
                });
              });
            },
            emit: function (eventName, data, callback) {
              socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
                });
              })
            }
          };
    }]);
})();
