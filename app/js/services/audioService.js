nutrifamiMobile.factory('AudioService', function ($cordovaNativeAudio) {
    var service = {};

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * AudioService.preloadSimple(audios)
     */
    service.preloadSimple = function (audios) {
        for (var audio in audios) {
            if (window.plugins && window.plugins.NativeAudio) {
                $cordovaNativeAudio.preloadSimple(audio, audios[audio]);
            }
        }
    };

    /**
     * 
     * @param {type} audio
     * @returns {undefined}
     * AudioService.play(audio);
     */
    service.play = function (audio) {
        if (window.plugins && window.plugins.NativeAudio) {
            $cordovaNativeAudio.play(audio);
        }

    };
    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * AudioService.stopAll(audios);
     */
    service.stopAll = function (audios) {
        for (var audio in audios) {
            console.log(audio);
            if (window.plugins && window.plugins.NativeAudio) {
                $cordovaNativeAudio.stop(audio);
            }
        }
    };
    return service;
});
