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
    service.preloadSimple = function (audios) {
        console.log("preloadSimple");
        if (window.plugins && window.plugins.NativeAudio) {
            for (var audio in audios) {
                $cordovaNativeAudio.preloadSimple(audio, audios[audio])
                        .then(function (msg) {
                            console.log(msg);
                        }, function (error) {
                            console.log(error);
                        });

            }
        }
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
        console.log("play");
        if (window.plugins && window.plugins.NativeAudio) {
            this.stopAll(audios);
            $cordovaNativeAudio.play(audio);
        }

    };
    
    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * 
     * AudioService.stopAll(audios);
     * 
     */
    service.stopAll = function (audios) {
        console.log("stopAll");
        if (window.plugins && window.plugins.NativeAudio) {
            for (var audio in audios) {
                $cordovaNativeAudio.stop(audio);
            }
        }
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
        if (window.plugins && window.plugins.NativeAudio) {
            this.stopAll(audios);
            for (var audio in audios) {
                $cordovaNativeAudio.unload(audio);
            }
        }
    };

    return service;
});
