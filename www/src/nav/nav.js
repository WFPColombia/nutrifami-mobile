nf2.controller('NavCtrl', function ($scope, $rootScope, $ionicPopover, UserService, TrainingService) {

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

    $rootScope.$on('$translateChangeSuccess', function (event, data) {
        console.log('$translateChangeSuccess');
        var language = data.language;
        $rootScope.lang = language;
        $scope.lang = language;
    });


});
