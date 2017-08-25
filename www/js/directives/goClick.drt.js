nutrifamiMobile.directive('goClick', function($location, $timeout, $ionicViewSwitcher) {
    return function(scope, element, attrs) {
        var path;

        attrs.$observe('goClick', function(val) {
            path = val;
        });

        element.bind('click', function() {
            scope.$apply(function() {
                $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
                $location.path(path);
            });
        });
    };
});
