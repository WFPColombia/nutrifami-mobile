nutrifamiMobile.directive('goClick', function ($location, $timeout) {
    return function (scope, element, attrs) {
        var path;

        attrs.$observe('goClick', function (val) {
            path = val;
        });

        element.bind('click', function () {
            scope.$apply(function () {
                
                $timeout( function(){ 
                    $location.path(path);
                }, 1000);
                
            });
        });
    };
});