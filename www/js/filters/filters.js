nutrifamiMobile.filter("trust", ['$sce', function($sce) {
    return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);

nutrifamiMobile.filter('format', function() {
    return function(input) {
        input = input || '';
        if (input.slice(0, 3) != '<p>') {
            input = "<p>" + input + "</p>";

        }
        return input;
    };
})
