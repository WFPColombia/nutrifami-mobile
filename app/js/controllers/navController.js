nutrifamiMobile.controller('NavController', function ($scope, $stateParams,$ionicPopover) {
        $ionicPopover.fromTemplateUrl('views/template/popover.tpl.html', {
        scope: $scope
    }).then(function (popover) {
        console.log(popover);
        $scope.popover = popover;
    });
});