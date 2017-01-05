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