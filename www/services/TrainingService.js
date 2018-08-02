nf2.factory('TrainingService', function ($rootScope, $http, $q, UserService) {

    var service = {};

    /**
     * @description Return true if the User is part of the staff (Trainer)
     * @returns {Array|Object}
     */
    service.isStaff = function () {
        var staff = JSON.parse(localStorage.getItem('staff'));
        if (staff) {
            return staff.is_staff;
        } else {
            return false;
        }

    };

    /**
     * @description Return the info of the current trainee in the offline community training
     * @returns {Array|Object}
     */
    service.getCurrentTrainee = function () {
        return JSON.parse(localStorage.getItem('current_trainee'));
    };

    /**
     * @description Save the info of the current trainee
     * @param {type} data
     * @param {type} is_staff
     * @returns {undefined}
     */
    service.saveCurrentTrainee = function (data, is_staff) {
        console.log('saveCurrentTrainee');
        localStorage.setItem("current_trainee", JSON.stringify(data));
        var staff = JSON.parse(localStorage.getItem('staff'));
        if (is_staff) {
            //Update de advance for the staff member
            UserService.setAvance(staff.advance);
        } else {
            //Update de advance for the selected trainee
            UserService.setAvance(data.advance);
        }
        staff.is_active = is_staff;
        localStorage.setItem("staff", JSON.stringify(staff));
        $rootScope.$broadcast('traineeUpdated', data);
    };

    /**
     * @description Return all trainees registred in the offline community training
     * @returns {Array|Object}
     */
    service.getAllTrainees = function () {
        return JSON.parse(localStorage.getItem('trainees'));
    };


    /**
     * @description Save/Update all trainees of the offline community training
     * @param {type} data
     * @returns {Array|Object}
     */
    service.saveAllTrainees = function (data) {
        localStorage.setItem("trainees", JSON.stringify(data));
    };

    /**
     * @description Return true if the any Trainee is active
     * @returns {Array|Object}
     */
    service.isTraineeActive = function () {
        var staff = JSON.parse(localStorage.getItem('staff'));
        if (staff) {
            return !staff.is_active;
        } else {
            return false;
        }

    };

    /**
     * @description Save the advance of the trainee in cache
     * @returns {undefined}
     */
    service.saveTraineeAdvance = function (advance) {
        var trainees = service.getAllTrainees();
        var current_trainee = service.getCurrentTrainee();
        for (var t in trainees) {
            if (trainees[t]['document'] === current_trainee.document) {
                trainees[t]['advance'].push(advance);
                UserService.setAvance(trainees[t]['advance']);
            }
        }
        service.saveAllTrainees(trainees);
        $rootScope.$broadcast('avanceSaved');
    };

    /**
     * 
     * @returns {undefined}
     */
    service.sinchronizeTraining = function () {

        service.synchronizeTrainees();


    };

    /**
     * 
     * @returns {$q@call;defer.promise}
     */
    service.synchronizeTrainees = function () {
        var trainees = service.getAllTrainees();

        var deferred = $q.defer();
        var promises = [];
        var promises2 = [];
        var deferred2 = $q.defer();
        for (var trainee in trainees) {

            var temp_trainee = trainees[trainee];
            var data = {
                temp_id: trainee,
                name: temp_trainee.name,
                document: temp_trainee.document
            };

            if (!temp_trainee.synchronized) {
                promises.push(
                        $http({
                            method: 'GET',
                            url: $rootScope.BASE_URL + 'api/check-user/' + data.document,
                            data: data
                        }).
                        then(function successCallback(response) {
                            trainees[response.config.data.temp_id].synchronized = true;
                            trainees[response.config.data.temp_id].id = response.data[0].id;

                        }, function errorCallback(response) {
                            trainees[response.config.data.temp_id].synchronized = false;
                            trainees[response.config.data.temp_id].id = 0;
                        }));
            }
        }

        $q.all(promises).then(function (res) {
            deferred.resolve();
            for (var trainee in trainees) {
                var temp_trainee = trainees[trainee];
                var data = {
                    username: temp_trainee.document,
                    password: 'abc12345',
                    terminos: true,
                    temp_id: trainee,
                    is_trainee: true
                };
                if (!temp_trainee.synchronized) {
                console.log(data)
                    promises2.push(
                            $http({
                                method: 'POST',
                                url: $rootScope.BASE_URL + 'api/create-user/',
                                data: data
                            }).
                            then(function successCallback(response) {
                                console.log(response)
                                trainees[response.config.data.temp_id].synchronized = true;
                                trainees[response.config.data.temp_id].id = response.data.id;

                            }, function errorCallback(response) {
                                console.log(response);
                                trainees[response.config.data.temp_id].synchronized = false;
                                trainees[response.config.data.temp_id].id = 0;
                            }));
                }

            }

            $q.all(promises2).then(function (res) {
                deferred2.resolve();
                console.log(trainees);
                service.saveAllTrainees(trainees);
                service.synchronizeTraineesAdvance();
            });
        });


    };

    service.synchronizeTraineesAdvance = function () {

        var trainees = service.getAllTrainees();

        var deferred = $q.defer();
        var promises = [];
        for (var trainee in trainees) {
            var temp_trainee = trainees[trainee];
            for (var advance in temp_trainee.advance) {
                var temp_advance = temp_trainee.advance[advance];
                var data = {
                    temp_id_user: trainee,
                    temp_id_advance: advance,
                    usuario: temp_trainee.id,
                    capacitacion: temp_advance.capacitacion,
                    modulo: temp_advance.modulo,
                    leccion: temp_advance.leccion
                };

                if (!temp_advance.synchronized) {
                    promises.push(
                            $http({
                                method: 'POST',
                                url: $rootScope.BASE_URL + 'api/trainee-advance/',
                                data: data
                            }).
                            then(function successCallback(response) {
                                trainees[response.config.data.temp_id_user].advance[response.config.data.temp_id_advance].synchronized = true;

                            }, function errorCallback(response) {
                                console.log(response);
                            }));
                }
            }
        }

        $q.all(promises).then(function (res) {
            deferred.resolve();
            service.saveAllTrainees(trainees);
            console.log('Trainees Advance Synchronized');
            $rootScope.$broadcast('synchronizeTrainingFinished');

        });
        return deferred.promise;

    };

    return service;
});