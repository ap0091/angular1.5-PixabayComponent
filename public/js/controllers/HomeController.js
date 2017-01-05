//this is the main controller that loads on index page.. it allows the user to search for a batch of images to be returned from Pixabay API if a search term is found
let HomeController = app.controller( "HomeController", function( $scope, $rootScope, $location, PixabayAPI ) {
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

    $rootScope.$on("goBack", function(){
        $location.path('/');
    });
});
