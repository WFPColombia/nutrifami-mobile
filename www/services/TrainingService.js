nutrifamiMobile.factory('TrainingService', function ($rootScope, UserService) {

    var service = {};

    /**
     * @description Return true if the User is part of the staff (Trainer)
     * @returns {Array|Object}
     */
    service.isStaff = function () {
        var staff = JSON.parse(localStorage.getItem('staff'));
        return staff.is_staff;
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
     * @returns {undefined}
     */
    service.saveCurrentTrainee = function (data, is_staff) {
        localStorage.setItem("current_trainee", JSON.stringify(data));
        var staff = JSON.parse(localStorage.getItem('staff'));
        if(is_staff){
            //Update de advance for the staff member
            UserService.setAvance(staff.advance);
        }else{
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
    service.saveAllTrainees = function(data){
        localStorage.setItem("trainees", JSON.stringify(data));
    };
    
    /**
     * @description Return true if the any Trainee is active
     * @returns {Array|Object}
     */
    service.isTraineeActive = function () {
        var staff = JSON.parse(localStorage.getItem('staff'));
        return !staff.is_active;
    };
    
    /**
     * @description Save the advance of the trainee 
     * @returns {undefined}
     */
    service.saveTraineeAdvance = function(advance){
        var trainees = service.getAllTrainees();
        var current_trainee = service.getCurrentTrainee();
        for(var t in trainees){
            if(trainees[t]['document'] === current_trainee.document){
                trainees[t]['advance'].push(advance);
                UserService.setAvance(trainees[t]['advance']);
                
            }
        }
        service.saveAllTrainees(trainees);
        $rootScope.$broadcast('avanceSaved');
        
    };


    return service;
});