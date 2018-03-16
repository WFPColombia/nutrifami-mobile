nf2.controller('CapacitatorCtrl', function ($ionicPlatform, $ionicModal, $scope, $ionicLoading, $filter, $ionicPopup, TrainingService, UserService, DownloadService) {
    'use strict';

    $ionicPlatform.ready(function () {

        $scope.form_add_trainee = {};
        $scope.form_status = 'add'; // add or edit
        $scope.trainees = TrainingService.getAllTrainees() || [];
        $scope.user = UserService.getUser();

        $ionicModal.fromTemplateUrl('modals/trainee/trainee.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalAdd = modal;
        });

        $scope.changeCurrentTrainee = function (trainee) {

            TrainingService.saveCurrentTrainee(trainee, false);
            $scope.current_trainee = trainee;
        };

        $scope.changeCurrentTraineeToMe = function () {
            var new_trainee = {
                name: $scope.user.first_name,
                document: $scope.user.username
            };
            TrainingService.saveCurrentTrainee(new_trainee, true);
            $scope.current_trainee = new_trainee;
        };

        $scope.addTrainee = function () {
            console.log('addTrainee');
            $scope.error = '';

            if ($scope.formStatus === 'new') {
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

            } else {
                console.log('edit trainee');
                console.log($scope.form_add_trainee.document);
                for (var t in $scope.trainees) {
                    if (t != $scope.current_trainee_index) {
                        if ($scope.trainees[t].document === $scope.form_add_trainee.document) {
                            $scope.error = 'El documento ya existe';
                            return false;
                        }
                    }
                }
                $scope.trainees[$scope.current_trainee_index] = $scope.form_add_trainee;
                var current_trainee = {
                    name: $scope.form_add_trainee.name,
                    document: $scope.form_add_trainee.document,
                    advance: $scope.form_add_trainee.advance
                };
                TrainingService.saveAllTrainees($scope.trainees);
                TrainingService.saveCurrentTrainee(current_trainee, false);
            }
            $scope.closeModal();
        };

        $scope.openModal = function (status, trainee_id) {
            console.log('openModal', status);
            var index = index || 0;
            $scope.formStatus = status;
            if (status === 'edit') {
                $scope.form_add_trainee = $scope.trainees[trainee_id];
                $scope.current_trainee_index = trainee_id;
            } else {
                $scope.form_add_trainee.id = 0;
                $scope.form_add_trainee.name = '';
                $scope.form_add_trainee.document = '';
                $scope.form_add_trainee.synchronized = false;
                $scope.form_add_trainee.advance = [];
            }
            $scope.modalAdd.show();
        };

        $scope.closeModal = function () {
            console.log('closeModal');
            //$scope.trainees = TrainingService.getAllTrainees() || [];
            $scope.modalAdd.hide();
        };

        $scope.deleteTrainee = function (trainee) {
            $scope.modal = {
                texto1: '¿Está seguro de eliminar el aprendiz?',
                texto2: 'Si eliminas este aprendiz se borraran todos sus datos',
                estado: 'alert' // ok, alert, error
            };
            $ionicPopup.show({
                templateUrl: 'modals/simple/simple.modal.html',
                scope: $scope,
                cssClass: 'salir-unidad',
                buttons: [{
                        text: $filter('translate')('Eliminar'),
                        type: 'button-positive',
                        onTap: function (e) {

                            if (trainee > -1) {
                                $scope.trainees.splice(trainee, 1);
                            }
                            TrainingService.saveAllTrainees($scope.trainees);
                            $scope.changeCurrentTraineeToMe();
                        }
                    }, {
                        text: $filter('translate')('Cancelar'),
                        onTap: function (e) {
                        }
                    }]
            });
        };

        $scope.sinchronizeTraining = function () {
            if (DownloadService.isOnline()) {
                TrainingService.sinchronizeTraining();
                $ionicLoading.show({
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 40
                });
            } else {
                $scope.modal = {
                    texto1: 'No hay conexión a Internet',
                    texto2: 'Para subir cambios debe estar conectado a Internet',
                    estado: 'alert' // ok, alert, error
                };
                $ionicPopup.show({
                    templateUrl: 'modals/simple/simple.modal.html',
                    scope: $scope,
                    cssClass: 'salir-unidad',
                    buttons: [{
                            text: 'Aceptar',
                            type: 'button-positive',
                            onTap: function (e) {
                            }
                        }]
                });
            }
        };

        $scope.$on('synchronizeTrainingFinished', function (event) {
            console.log('synchronizeTrainingFinished');
            $ionicLoading.hide();
        });

        function init() {
            if (TrainingService.isStaff()) {
                $scope.current_trainee = TrainingService.getCurrentTrainee();
            }
        }

        init();

    });
});
