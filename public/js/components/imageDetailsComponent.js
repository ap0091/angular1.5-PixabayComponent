//this component will build a table with basic data about the image, and a link to get to the fullsize if needed
let ImageDetailsComponent = app.component( "imageDetailsComponent", {
    bindings: {
        obj: '='
    },
    scope: { obj: '=' },
    templateUrl: '/templates/component/imageDetailsComponent.html',
});