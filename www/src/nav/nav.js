nutrifamiMobile.controller('NavCtrl', function ($scope, $ionicPopover, UserService, TrainingService) {

    $ionicPopover.fromTemplateUrl('views/template/popover.tpl.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

    $scope.user = UserService.getUser();

    if (TrainingService.isStaff()) {
        $scope.current_trainee = TrainingService.getCurrentTrainee();
    }



    $scope.$on('traineeUpdated', function (event, data) {
        $scope.current_trainee = data;
    });


});
