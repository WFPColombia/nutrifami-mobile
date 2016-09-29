nutrifamiMobile.factory('AudioService', function ($cordovaNativeAudio) {
    var service = {};

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * 
     * AudioService.preloadSimple(audios)
     * 
     */
    service.preloadSimple = function (audios, callback) {
        callback = callback || function () {
        };
        console.log("Preloadsimple");
        console.log(audios);
        if (window.plugins && window.plugins.NativeAudio) {
            for (var audio in audios) {
                $cordovaNativeAudio.preloadSimple(audio, audios[audio])
                        .then(function (msg) {
                        }, function (error) {
                            console.log(error);
                        });

            }
        }
        callback();
    };

    /**
     * 
     * @param {type} audio
     * @param {type} audios
     * @returns {undefined}
     * 
     * AudioService.play(audio, audios)
     * 
     */
    service.play = function (audio, audios) {

        this.stopAll(audios, function () {
            console.log(audio);
            if (window.plugins && window.plugins.NativeAudio) {
                $cordovaNativeAudio.play(audio);
            }
        });
    };

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * 
     * AudioService.stopAll(audios);
     * 
     */
    service.stopAll = function (audios, callback) {
        console.log("stopAll");
        for (var audio in audios) {
            if (window.plugins && window.plugins.NativeAudio) {
                $cordovaNativeAudio.stop(audio);
            }
        }
        callback();
    };

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * 
     * AudioService.unload(audios);
     * 
     */
    service.unload = function (audios) {
        console.log("unload");
        this.stopAll(audios, function () {
            for (var audio in audios) {
                if (window.plugins && window.plugins.NativeAudio) {
                    $cordovaNativeAudio.unload(audio);
                }
            }
        });
    };

    return service;
});
