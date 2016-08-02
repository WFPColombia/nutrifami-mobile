/*global angular*/
nutrifamiMobile.controller('HomeController', function ($scope, $timeout, $cordovaFileTransfer) {
    'use strict';
    document.addEventListener("deviceready", function () {

        $scope.mensaje = "El dispositivo está listo";


        var url = "http://cdn.wall-pix.net/albums/art-space/00030109.jpg";
        var targetPath = cordova.file.documentsDirectory + "testImage.png";
        $scope.path = targetPath;
        var trustHosts = true;
        var options = {};
        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function (result) {
                    // Success!
                    console.log("Imagen cargada");
                }, function (err) {
                    // Error
                }, function (progress) {
                    $timeout(function () {
                        $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                    });
                });
    }, true);

});