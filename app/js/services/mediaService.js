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
        console.log("MediaService.preloadSimple");
        callback = callback || function() {};

        if (window.cordova) {
            for (audio in audios) {
                audios[audio] = $cordovaMedia.newMedia(audios[audio], function() {
                        console.log("playAudio():Audio Success");
                    },
                    function(err) {
                        console.log("playAudio():Audio Error: " + err);
                    });
            }
        }
        callback(audios);
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

        console.log("MediaService.play: " + audio);
        this.stopAll(audios, function() {
            if (window.plugins) {
                audios[audio].setVolume(1);
                audios[audio].play();
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
        console.log("MediaService.stopAll: " + audios);
        for (var audio in audios) {
            if (window.plugins) {
                audios[audio].stop(); // Android*/
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
        console.log("MediaService.unload:");
        this.stopAll(audios, function() {
            for (var audio in audios) {
                if (window.plugins) {
                    audios[audio].release();
                }
            }
        });
    };

    return service;
});
