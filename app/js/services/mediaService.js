nutrifamiMobile.factory('MediaService', function($cordovaMedia) {
    var service = {};

    /**
     * 
     * @param {type} audios
     * @returns {undefined}
     * 
     * MediaService.preloadSimple(audios)
     * 
     */
    service.preloadSimple = function(audios, callback) {
        callback = callback || function() {};

        var media = [];
        if (window.cordova) {
            for (audio in audios) {
                media.push($cordovaMedia.newMedia(audios[audio]))
            }
        }
        callback(media);
    };

    /**
     * 
     * @param {type} audio
     * @param {type} audios
     * @returns {undefined}
     * 
     * MediaService.play(audio, audios)
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
     * MediaService.stopAll(audios);
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
     * MediaService.unload(audios);
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
