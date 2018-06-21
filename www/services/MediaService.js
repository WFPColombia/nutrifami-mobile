nf2.factory('MediaService', function ($cordovaMedia, $cordovaFile, $rootScope) {
    var service = {};
    var audios = {};

    /**
     * 
     * @param {type} aud
     * @param {type} callback
     * @returns {undefined}
     */
    service.preloadSimple = function (aud, callback) {
        console.log(aud)
        callback = callback || function () {};
        service.unload(function () {
            console.log("MediaService.preloadSimple");
            for (var audio in aud) {
                console.log(aud[audio]);
                if (window.cordova) {
                    audios[audio] = $cordovaMedia.newMedia(aud[audio]);
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
            } else if (device.platform.toLowerCase() === 'windows') {
                return "ms-appx-web://17634nutrifami.nutrifami/www/" + s;
            }

        }
        return s;
    };

    return service;
});