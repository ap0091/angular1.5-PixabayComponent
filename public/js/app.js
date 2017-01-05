let app = angular.module('AngularSampleApp', ['ngRoute']);

app.config(
    function setupRoutes( $routeProvider, $locationProvider )
    {
        $routeProvider .
        when('/', {
            templateUrl: '/templates/page/homePage.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl',
        }).
        when( '/postDetails/:id', {
            templateUrl: '/templates/page/imageDetails.html',
            controller: 'ImageDetailsController',
            controllerAs: 'imageCtrl',
        }).
        otherwise( {
            redirectTo: '/'
        } );

        //prettify url and remove #
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
);

