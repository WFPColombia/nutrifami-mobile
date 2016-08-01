nutrifamiApp.factory('PerfilService', ['$http', '$cookieStore', '$rootScope', '$timeout',
            function () {
                var service = {};
                service.editarUsuario = function (usuario, callback) {
                    nutrifami.editarUsuarioActivo(usuario, function (response) {
                        callback(response);
                    });
                    
                };
                
                service.agregarFamiliar = function (familiar, callback) {
                    nutrifami.agregarFamiliar(familiar, function (response) {
                        callback(response);
                    });
                    
                };
                return service;
            }]);
