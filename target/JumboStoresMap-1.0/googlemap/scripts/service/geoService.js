dnsApp.factory('geoService', function ($resource, $http, $q) {

    console.log("geoService.js");

    var service = {};

    var urls = {
        getSettings: "api/settings"
    };

    service.getSettings = function () {
        var url = urls.getSettings;
        var defer = $q.defer();

        var response = $http({
            method: "get",
            url: url,
            cache: false
        });

        response.success(function (responce) {
            defer.resolve(responce);
        }).error(function (responce) {
            defer.reject(responce);
        });

        return defer.promise;
    };


    return service;
});