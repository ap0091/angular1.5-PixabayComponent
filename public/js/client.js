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


//this component will build a table with basic data about the image, and a link to get to the fullsize if needed
let ImageDetailsComponent = app.component( "imageDetailsComponent", {
    bindings: {
        obj: '='
    },
    scope: { obj: '=' },
    templateUrl: '/templates/component/imageDetailsComponent.html',
});
//this is the main controller that loads on index page.. it allows the user to search for a batch of images to be returned from Pixabay API if a search term is found
let HomeController = app.controller( "HomeController", function( $scope, $rootScope, PixabayAPI ) {
    var vm = this;
    vm.images = null;
    vm.singleImageData = null;

    //when anything is typed into search bar, start searching pixabay on the fly
    vm.changeSearch = function() {
        if( vm.searchTerm ) {
            PixabayAPI.getImages( vm.searchTerm ).then( function( data ) {
                if( data.length ) {
                    vm.images = data;
                } else {
                    vm.images = null;
                    vm.errorMessage = "No Images Found";
                }
            } ).catch( function() {
                vm.errorMessage = "Unable to communicate with Pixabay";
            } );
        } else {
            vm.images = null;
        }

        //set the search string in the rootscope so we can use it when we come back.. if we do...
        $rootScope.searchString = vm.searchTerm;
    };

    //if we are returning to this function from the details page, repopulate the searchbar with the original search string and make a request to pixabay
    if( $rootScope.searchString ) {
        vm.searchTerm = $rootScope.searchString;
        vm.changeSearch();
    } else {
        vm.searchTerm = '';
    }

    //this is assistant to save data for details component
    vm.details = function( image ) {
        vm.singleImageData = image;
    };
});

//this is the controller for the individual image details page.. it holds the data for the image details component as well
app.controller("ImageDetailsController", function($scope, $routeParams, PixabayAPI) {
    let vm = this;
    let id = $routeParams.id;

    vm.details = null;

    PixabayAPI.getSingleImage( id ).then( function( data ) {
        if( data.length ) {
            vm.details = data[0];
            vm.details.individual = true;
        } else {
            vm.details = null;
            vm.errorMessage = "Error with ID";
        }
    } ).catch( function() {
        vm.errorMessage = "Unable to communicate with Pixabay";
    } );

    vm.goBack = function() {
        window.history.back();
    };
});
let PixabayAPI = app.service('PixabayAPI', function( $http ) {
    this.getImages = getImages;
    this.getSingleImage = getSingleImage;

    function getImages( term ) {
        var url = 'https://pixabay.com/api/?key=';
        var key = '419541-6e8571fedf8011641e1d5ee81&q=';
         return $http.get( url + key + term ).then( function( response ) {
             var data = response.data.hits;
             return data;
         });
    };

    function getSingleImage( id ) {
        var url = 'https://pixabay.com/api/?key=';
        var key = '419541-6e8571fedf8011641e1d5ee81&id=';
        return $http.get( url + key + id ).then( function( response ) {
            var data = response.data.hits;
            return data;
        });
    };
});