/*global angular*/
nutrifamiMobile.controller('FileController', function ($scope, $timeout, $cordovaFileTransfer) {
    'use strict';
    document.addEventListener("deviceready", function () {

        console.log("El dispositivo está listo");
        var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
        var targetPath = cordova.file.documentsDirectory + "testImage.png";
        var trustHosts = true;
        var options = {};
        
        $scope.url = url;
        $scope.targetPath = targetPath;
        $scope.trustHosts = trustHosts;
        $scope.response = "";

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function (result) {
                    // Success!
                    console.log("Success");
                    $scope.response = "Success";
                }, function (err) {
                    // Error
                    console.log("Error");
                    $scope.response = err;
                }, function (progress) {
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                });


    }, true);

});