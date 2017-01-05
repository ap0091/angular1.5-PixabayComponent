let DownloadCount = app.filter('downloadCount', function(){
    return function(number){
        if( 3000 < number ) {
            return number + "-high".toUpperCase();
        } else {
            return number + "-good".toUpperCase();
        }
    }
})