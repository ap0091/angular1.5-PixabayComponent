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