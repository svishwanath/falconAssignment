(function(){
    'use strict'

   function initForm(scope){

            scope.countries = [
                {value: "Afghanistan", key:"134"},
                {value: "Denmark", key:"140"},
                {value: "France" , key:"135"},
                {value: "Germany", key:"156"},
                {value: "Spain", key: "234"}
            ];
            scope.countrySelected = "";

            scope.languages = [
                {value:"Afrikaans",key:"31"},
                {value:"Spanish",key:"33"},
                {value:"French",key:"35"},
                {value:"Danish",key:"37"},
                {value:"German",key:"39"}
            ];
            scope.languageSelected = "";

            scope.cities = [
                {value:"Madrid",key:"1"},
                {value:"Kabul",key:"2"},
                {value:"Paris",key:"3"},
                {value:"Copenhagen",key:"4"},
                {value:"Berlin",key:"6"}
            ];
            scope.citySelected = "";

            scope.regions = [
                {value:"Bernabue",key:"20"},
                {value:"Norreport",key:"22"},
                {value:"Norrebro",key:"44"},
                {value:"Elmegade",key:"24"},
                {value:"Triangle",key:"26"}
            ];
            scope.regionSelected = "";
            scope.channels  = [
                {name:"Konfirmanden", id:433104606739910},
                {name:"netto", id:43346739910},
                {name:"brugsen", id:4387739910}
            ];
            scope.channelSelected = "";
            scope.insertTag = "";
        return;
    }
    var falconTestControllers = angular.module('falconTestControllers', []);

    falconTestControllers.controller("HeaderCtrl", ['$scope','$location',
        function($scope, $location) {
            $scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };
        }
    ]);


    falconTestControllers.controller('PublishListCtrl', ['$scope', 'socket','$http',
        function($scope, socket, $http){
            $http.get('api/publish').success(function(data) {
                $scope.publishes = data.response;
            });
            socket.on('newPublish', function (item) {
                $scope.publishes.push(item);
            });

    }]);

    falconTestControllers.controller('PublishDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
        function($scope, $routeParams, $http, $location){
            $http.get('api/publish/' + $routeParams.publishId).success(function(data) {
                $scope.publish = data.response;
            });

            $scope.deleteItem = function() {
                $http.delete('api/publish/'+ $routeParams.publishId)
                    .success(function(data){
                        $location.path("/publishing");
                    });
            };

            $scope.updateItem = function() {
                $location.path("/publishing/update/" + $routeParams.publishId);
            };
    }]);


    falconTestControllers.controller('PublishUpdateCtrl', ['$scope', '$routeParams', '$http', '$location',
        function($scope, $routeParams, $http, $location){
            $scope.header = "Update the item";
            $http.get('api/publish/' + $routeParams.publishId).success(function(data) {
                $scope.myForm = data.response;
                var itemForm = $scope.myForm;
                console.log($scope.myForm);
                initForm($scope);
                $scope.countries.push(itemForm.geo.countries[0]);
                $scope.countrySelected = itemForm.geo.countries[0];
                $scope.languages.push(itemForm.geo.languages[0]);
                $scope.languageSelected = itemForm.geo.languages[0];
               $scope.cities.push(itemForm.geo.cities[0]);
                $scope.citySelected = itemForm.geo.cities[0];
                $scope.regions.push(itemForm.geo.regions[0]);
                $scope.regionSelected = itemForm.geo.regions[0];
                $scope.channels.push(itemForm.channels[0]);
                $scope.channelSelected = itemForm.channels[0];

            });

            $scope.submitForm = function() {
                var itemForm = $scope.myForm;
                itemForm.geo.countries =[]; 
                itemForm.geo.countries.push($scope.countrySelected);
                itemForm.geo.languages = [];
                itemForm.geo.languages.push($scope.languageSelected);
                itemForm.geo.cities = [];
                itemForm.geo.cities.push($scope.citySelected);
                itemForm.geo.regions = [];
                itemForm.geo.regions.push($scope.regionSelected);
                itemForm.channels = [];
                itemForm.channels.push($scope.channelSelected);
                $http.put('api/publish/' + $routeParams.publishId, $scope.myForm)
                    .success(function(data){
                        $location.path("/publishing");
                    });
            };

        }
    ]);

    falconTestControllers.controller('PublishCreateCtrl', ['$scope', '$http', '$location',
        function($scope,  $http, $location) {
            $scope.header = "Create new publish item";
            $scope.myForm = {};
            var myForm = $scope.myForm;
            myForm.content = {};
            myForm.content.message = "";
            myForm.content.media = {};
            myForm.content.media.fileName="";
            myForm.content.media.url="";
            myForm.tags = [];
            myForm.status = "";
            myForm.channels = [];
            myForm.geo = {countries:[], regions:[], cities:[], languages:[]};


            initForm($scope);

            $scope.addTag = function() {
                if($scope.insertTag !== undefined && $scope.inserTag !== "") {
                    myForm.tags.push($scope.insertTag);
                }
            };

            $scope.submitForm = function() {
                myForm.id = Math.floor((Math.random() * 1000000) + 1);
                myForm.geo.countries.push($scope.countrySelected);
                myForm.geo.languages.push($scope.languageSelected);
                myForm.geo.cities.push($scope.citySelected);
                myForm.geo.regions.push($scope.regionSelected);
                myForm.channels.push($scope.channelSelected);
                console.log("$scope: ",$scope.myForm);
                $http.post('api/publish', $scope.myForm)
                    .success(function(data){

                        $location.path("/publishing");
                    });
            };
        }]);

    falconTestControllers.controller('ReachGraphCtrl', ['$scope', '$http',
        function($scope, $http) {
		$('#graph-form').hide();
              $('#reachgraphbutton').click(function(){
			 $('#graph-form ').show();
			  });
            $scope.reachForm = {};
            $scope.typePost = [
                {value: "post_impressions"},
                {value: "post_impressions_organic"},
                {value: "post_impressions_paid"},
                {value: "post_impressions_viral"}
            ];

            $scope.timeOptions =[
                {value: "2013-08-12T08:15:08.57Z"},
                {value: "2013-08-12T08:45:19.19Z"},
                {value: "2013-08-12T09:00:02.23Z"},
                {value: "2013-08-12T09:03:23.26Z"},
                {value: "2013-08-12T09:06:39.25Z"},
                {value: "2013-08-12T09:09:16.74Z"},
                {value: "2013-08-12T09:10:26.60Z"}

            ]
            $scope.timeSelected ="";
            $scope.postSelected="";

            $http.get('api/graph').success(function(data) {

              $scope.graphData = data.response;
            });

            $scope.submitNewValue = function(){
                if($scope.reachForm.value != 0){
                    $scope.reachForm.typePost = $scope.postSelected.value;
                    $scope.reachForm.time = $scope.timeSelected.value;
                    console.log("Form: ",$scope.reachForm);
                    $http.post('api/graph', $scope.reachForm)
                        .success(function(data){


                        });
                }
                };

        }
    ]);
})();
