nutrifamiMobile.factory('AudioService', function($cordovaNativeAudio) {
    var service = {};

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * 
     * AudioService.preloadSimple(audios)
     * 
     */
    service.preloadSimple = function(audios, callback) {
        callback = callback || function() {};
        if (window.plugins && window.plugins.NativeAudio) {
            for (var audio in audios) {
                $cordovaNativeAudio.preloadSimple(audio, audios[audio])
                    .then(function(msg) {}, function(error) {
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
    service.play = function(audio, audios) {

        this.stopAll(audios, function() {
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
    service.stopAll = function(audios, callback) {
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
    service.unload = function(audios) {
        this.stopAll(audios, function() {
            for (var audio in audios) {
                if (window.plugins && window.plugins.NativeAudio) {
                    $cordovaNativeAudio.unload(audio);
                }
            }
        });
    };

    return service;
});
