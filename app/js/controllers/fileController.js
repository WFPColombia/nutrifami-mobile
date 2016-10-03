/*global angular*/
nutrifamiMobile.controller('FileController', function($ionicPlatform, $http, $scope, $timeout, $cordovaFileTransfer) {
    'use strict';
    $ionicPlatform.ready(function() {


        console.log("El dispositivo está listo");
        var url = "http://nutrifami.org/js/capacitacion.JSON";
        var targetPath = cordova.file.applicationStorageDirectory + "capacitacion.JSON";
        var trustHosts = true;
        var options = {};

        $scope.url = url;
        $scope.targetPath = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "";



        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            .then(function(result) {
                // Success!
                console.log("Success");
                $scope.response = "Success";

                $http.get("js/capacitacion.JSON").then(function(response) {
                    $scope.myData = response.data;

                    console.log($scope.myData);
                });

                console.log(result);
            }, function(err) {
                // Error
                console.log("Error");
                $scope.response = err;
            }, function(progress) {
                $timeout(function() {
                    $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                });
            });
    });

});
