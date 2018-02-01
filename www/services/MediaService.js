nutrifamiMobile.factory('MediaService', function ($cordovaMedia) {
    var service = {};
    var audios = {};

    /**
     * 
     * @param {type} aud
     * @param {type} callback
     * @returns {undefined}
     */
    service.preloadSimple = function (aud, callback) {
        callback = callback || function () {};
        service.unload(function () {
            console.log("MediaService.preloadSimple");
            if (window.cordova) {
                for (var audio in aud) {
                    audios[audio] = $cordovaMedia.newMedia(aud[audio], function (response) {
                        console.log("playAudio():Audio Success " + response);
                    }, function (err) {
                        console.log("playAudio():Audio Error: " + err);
                    });
                }
            }
            console.log(audios);
            callback();
        });

    };

    /**
     * 
     * @param {type} audio
     * @returns {undefined}
     * 
     * MediaService.play(audio, audios)
     * 
     */
    service.play = function (audio) {
        this.stopAll(function () {
            console.log("MediaService.play: " + audio);
            if (window.plugins) {
                audios[audio].setVolume(1);
                audios[audio].play();
            }
        });
    };

    /**
     * 
     * @param {function} callback
     * @returns {undefined}
     * 
     * MediaService.stopAll(audios);
     * 
     */
    service.stopAll = function (callback) {
        console.log("MediaService.stopAll: ");
        for (var audio in audios) {
            if (window.plugins) {
                audios[audio].stop(); // Android*/
            }
        }
        callback();
    };

    /**
     * 
     * @param {type} callback
     * @returns {undefined}
     * 
     * MediaService.unload(audios);
     * 
     */
    service.unload = function (callback) {
        callback = callback || function () {
        };
        this.stopAll(function () {
            console.log('MediaService.unload:');
            for (var audio in audios) {
                if (window.plugins) {
                    audios[audio].release();
                }
            }
            audios = {};
        });
        callback();
    };

    service.getMediaURL = function (s) {
        if (window.cordova) {
            if (device.platform.toLowerCase() === "android") {
                return "/android_asset/www/" + s;
            }

        }
        return s;
    };

    return service;
});