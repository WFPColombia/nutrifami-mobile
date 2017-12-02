nutrifamiMobile.controller('NavController', function($scope, $ionicPopover, UserService) {
    $ionicPopover.fromTemplateUrl('views/template/popover.tpl.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    $scope.usuarioActivo = UserService.getUser();




});
