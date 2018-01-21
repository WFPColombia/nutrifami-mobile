nutrifamiMobile.controller('CapacitadorCtrl', function ($ionicPlatform, $scope, TrainingService, UserService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.form_add_trainee = {};
        $scope.trainees = TrainingService.getAllTrainees() || [];
        $scope.user = UserService.getUser();


        $scope.changeCurrentTrainee = function (trainee) {

            TrainingService.saveCurrentTrainee(trainee, false);
            $scope.current_trainee = trainee;
        };
        
        $scope.changeCurrentTraineeToMe = function(){
            var new_trainee = {
                name: 'Yo',
                document: $scope.user.documento
            };
            TrainingService.saveCurrentTrainee(new_trainee, true);
            $scope.current_trainee = new_trainee;
        };

        $scope.addTrainee = function () {

            $scope.error = '';
            //Validate if the document exists
            for (var t in $scope.trainees) {
                if ($scope.trainees[t].document === $scope.form_add_trainee.document) {
                    $scope.error = 'El documento ya existe';
                    return false;
                }
            }
            var new_trainee = {
                name: $scope.form_add_trainee.name,
                document: $scope.form_add_trainee.document,
                advance: []
            };

            $scope.trainees.push(new_trainee);

            //Updating de cache for trainees
            TrainingService.saveAllTrainees($scope.trainees);
            TrainingService.saveCurrentTrainee(new_trainee, false);

            $scope.current_trainee = new_trainee;
            $scope.form_add_trainee.name = '';
            $scope.form_add_trainee.document = '';
        };



        function init() {
            if (TrainingService.isStaff()) {
                $scope.current_trainee = TrainingService.getCurrentTrainee();
            }
        }

        init();

    });
});