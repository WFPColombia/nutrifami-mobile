nutrifamiMobile.factory('AudioService', function ($cordovaNativeAudio) {
    var service = {};

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * AudioService.preloadSimple(audios)
     */
    service.preloadSimple = function (audios) {
        console.log("AudioService.preloadSimple:::");
        console.log(audios);
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
        console.log("AudioService.play ::: "+audio);
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
        console.log("AudioService.stopAll(audio)" + audios);
        for (var audio in audios) {
            if (window.plugins && window.plugins.NativeAudio) {
                $cordovaNativeAudio.stop(audios[audio]);
            }
        }
    };
    return service;
});
