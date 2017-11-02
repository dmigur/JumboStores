'use strict';

dnsApp.config(function (constants, $stateProvider, $urlRouterProvider) {

    var availableState = constants.availableState;

    $stateProvider
        .state(availableState.workspace.name, {
            url: availableState.workspace.url,
            views: {
                '': {
                    templateUrl: 'views/workspace/geomap.html',
                    controller: 'mainController'
                }
            }
        });

    $urlRouterProvider.otherwise(availableState.workspace.url);
});