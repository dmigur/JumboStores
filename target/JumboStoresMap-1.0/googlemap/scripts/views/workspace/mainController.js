'use strict';

dnsApp.controller('mainController', function ($scope, $timeout, geoService, $http) {

    console.log("main controller : ");
    $scope.stores = null;
    $scope.defaultAddress = "Amsterdam";
    $scope.defaultShowPlaces = 5;
    $scope.address = null;
    $scope.view_tab = "geo";
    $scope.showPlaces = null;

    $scope.choosePlacesNumber = [
        {
            number: 5, text: "5"
        },
        {
            number: 25, text: "25"
        },
        {
            number: 50, text: "50"
        },
        {
            number: 100, text: "100"
        },
        {
            number: 1000000, text: "ALL"
        }

    ];

    $scope.onRefreshMap = function(){
        console.log("Refresh map");
    }

    $scope.onChangeShowPlaces=function (val) {
        findNearestShops($scope.showPlaces, $scope.address);
    }


    $scope.onFindPlaces = function () {

        findNearestShops($scope.showPlaces, $scope.address);
    }


    $scope.loadSettings = function () {

        console.log("getting settings");
        geoService.getSettings().then(function (result) {

            var settings = result;

            $scope.itemsFile = settings.itemsFile;
            $scope.defaultAddress = $scope.address = settings.address;
            $scope.showPlaces = $scope.defaultShowPlaces = settings.showItems;

            var googleScript = settings.geoGoogleMapUrl + "&key=" + settings.geoGoogleMapKey;

            var scriptElem = loadScriptSync(googleScript);

            scriptElem.onload = function () {

                $.getJSON($scope.itemsFile, function(json) {
                    console.log("stores = " + json.stores.length); // this will show the info it in firebug console

                    $scope.stores = json.stores;

                    initializeMap($scope.stores, $scope.showPlaces, $scope.address);

                });

            }



        }, function (error) {

            console.log("Error loading GEOMAP settings")

        });
    };

    function loadScriptSync (src) {
        var s = document.createElement('script');
        s.src = src;
        s.type = "text/javascript";
        s.async = false;                                 // <-- this is important
        document.getElementsByTagName('head')[0].appendChild(s);
        return s;
    }
    $scope.changeTab = function (tab) {
        $scope.view_tab = tab;
    };

    $scope.loadSettings();


})
;