nutrifamiMobile.factory('UserService', function UserService($rootScope, $auth, $http) {

    var service = {};
    
    //var baseUrl = 'http://usuarios.nutrifami.org/api/';
    var baseUrl = 'http://localhost:8000/api/';

    /**
     * @description Retorna el token de usuario
     * @returns {unresolved}
     */
    service.getToken = function () {
        return $auth.getToken();
    };

    /**
     * @description Retorna verdadero si el usuario se encuentra autenticado dentro de la aplicación
     * @returns {boolean}
     */
    service.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };

    /**
     * 
     * @param {type} provider
     * @returns {undefined}
     * @param {type} provider
     * @returns {undefined}
     */
    service.authenticate = function (provider) {
        console.log("authenticate");
        $auth
                .authenticate(provider)
                .then(this.successAuth)
                .catch(this.failedAuth);
    };

    service.signup = function (username, email, password) {
        var user = {
            username: username,
            email: email,
            password: password,
            token:'token'
        };

        $auth.signup(user)
                .then(function (response) {
                    console.log(response);
                    service.login(username,password);
                })
                .catch(function (response) {
                    console.log(response);
                    if(response.data.username){
                        service.failedAuth({message: "Ya existe este nombre de usuario"});
                    }else if(response.data.email){
                        service.failedAuth({message: "El correo electrónico ya se encuentra registrado"});
                    }else{
                        service.failedAuth({message: "Ha ocurrido un error inesperado, inténtelo más tarde!!"});
                    }
                    
                });
    };

    /**
     * 
     * @param {type} username
     * @param {type} password
     * @returns {undefined}
     */
    service.loginCedula = function (username, password) {
        nutrifami.login(username, password, function (response) {
            if (response.success) {
                if (response.data.response === 1) {
                    response.data.access_token = 'no-token';
                    response.data.username = username;
                    //preparar el objeto para guardarlo luego
                    console.log(response);
                    service.successAuth(response);
                } else {
                    service.failedAuth({message: 'El documento es incorrecto'});
                }
            } else {
                service.failedAuth({message: 'Ha ocurrido un error durante la ejecución'});
            }
        });
    };

    service.login = function (username, password) {
        var user = {
            username: username,
            password: password
        };
        $auth.login(user)
                .then(function (response) {
                    // Redirect user here after a successful log in.
                    //organizamos la respuesta para pasarla al SuccesAuth y que se guarden bien todos los datos
                    var response2 = {
                        data: response.data.user
                    };
                    response2.data.access_token = response.data.token;

                    service.successAuth(response2);
                })
                .catch(function (response) {
                    service.failedAuth({message: 'Los datos ingresados no son correctos, inténtelo nuevamente'});
                });
    };

    /**
     * @description Cierra sesión de $auth, elimina el usuario de la cache y lanza evento UserLoogedOut de Ionic
     * @returns {undefined}
     */
    service.logOut = function () {
        $auth.logout();
        $rootScope.globals = {};
        localStorage.removeItem('globals');
        localStorage.removeItem("usuarioActivo");
        localStorage.removeItem("usuarioAvance");
        localStorage.removeItem("usuarioFamilia");
        localStorage.removeItem("usuarioFamiliaAvance");
        localStorage.removeItem("misCompras");
        $rootScope.$emit('userLoggedOut');
    };

    /**
     * @description Guard
     * @param {type} user
     * @returns {None}a la información de usuario en la memoria cache
     * @param {object} user
     * @returns {None}
     */
    service.setUser = function (data) {
        var usuarioActivo = data;
        //var usuarioFamiliaAvance = {};
        //var usuarioFamilia = {};
        delete usuarioActivo["avances"];
        /*if (data.access_token === 'no-token') {
            usuarioFamiliaAvance = usuarioActivo.avance;
           
            delete usuarioFamiliaAvance[usuarioActivo.id];

            
            usuarioFamilia = usuarioActivo.familia;
            delete usuarioActivo["familia"];



            
            localStorage.setItem("usuarioFamiliaAvance", JSON.stringify(usuarioFamiliaAvance));
            localStorage.setItem("usuarioFamilia", JSON.stringify(usuarioFamilia));
        } else {
            
            localStorage.setItem("usuarioFamiliaAvance", JSON.stringify({}));
            localStorage.setItem("usuarioFamilia", JSON.stringify({}));
        }*/

        $rootScope.globals = {
            currentUser: {
                username: 'usuarioActivo.username',
                id: 'usuarioActivo.id'
            }
        };
        localStorage.setItem("user", JSON.stringify(usuarioActivo));
        localStorage.setItem("globals", JSON.stringify($rootScope.globals));
    };


    /**
     * @description Devuelve la informacion de usuario guardada en cache
     * @returns {Array|Object}
     */
    service.getUser = function () {
        return JSON.parse(localStorage.getItem('user'));
    };
    
    /**
     * @description Devuelve la informacion de usuario guardada en cache
     * @returns {Array|Object}
     */
    service.updateUser = function (user) {
        console.log($auth);
        $http({
            method: 'PUT',
            url: baseUrl + 'usuarios/'+user.id+'/',
            data: user
        }).then(function successCallback(response) {
            delete response.data["avances"];
           localStorage.setItem("user", JSON.stringify(response.data));
           $rootScope.$broadcast('userUpdated', response.data);
        }, function errorCallback(response) {
            console.log(response);
            $rootScope.$broadcast('userFaliedUpdate', response.data);
        });
    };

    /**
     * 
     * @param {type} response
     * @returns {undefined}
     */
    service.successAuth = function (response) {
        console.log("successAuth");
        $auth.setToken(response.access_token);
        service.setAvance(response.data);
        service.setUser(response.data);
        $rootScope.$broadcast('userLoggedIn', {data: response.data});
    };

    /**
     * 
     */
    service.failedAuth = function (response) {
        console.log("failedAuth");
        $rootScope.$broadcast('userFailedLogin', response);
    };
    
    /**
     * 
     * @returns {undefined}
     */
    service.crearGestorAvance = function(){
        
        var usuarioAvance = {};
        usuarioAvance['totalUnidades'] = Object.keys(nutrifami.training.cap_lecciones).length;
        usuarioAvance['medallas'] = 0;
        usuarioAvance['capacitacionesTerminadas'] = 0;
        usuarioAvance['modulosTerminados'] = 0;
        usuarioAvance['puntos'] = 0;
        usuarioAvance['porcentaje'] = 0;
        usuarioAvance['diplomas'] = [];
        usuarioAvance['capacitaciones'] = {};
        usuarioAvance['modulos'] = {};
        usuarioAvance['lecciones'] = {};
        
        for (var i in nutrifami.training.cap_capacitaciones) {
            if (i !== 'completo') {
                var tempObject = {};
                tempObject[i] = {
                    completo : false,
                    totalModulos:Object.keys(nutrifami.training.getModulosId(i)).length,
                    completados : 0,
                    porcentaje:0
                };
                $.extend(usuarioAvance.capacitaciones, tempObject);
            }
        }

        for (var i in nutrifami.training.cap_modulos) {
            var tempObject = {};
            tempObject[i] = {
                completo:false,
                totalLecciones:Object.keys(nutrifami.training.getLeccionesId(i)).length,
                completados : 0,
                porcentaje:0
            };
            $.extend(usuarioAvance.modulos, tempObject);
        }
        
        for (var i in nutrifami.training.cap_lecciones) {
            var tempObject = {};
            tempObject[i] = false;
            $.extend(usuarioAvance.lecciones, tempObject);
        }
        
        localStorage.setItem("usuarioAvance", JSON.stringify(usuarioAvance));
        
    };
    
    service.setAvance = function(data){
        //service.crearGestorAvance();

        var usuarioAvance = service.getAvance();
        var avances = data.avances;
        
        for(var a in avances){
            usuarioAvance['lecciones'][avances[a]['leccion']] = true; 
            
        }
        
        //Comprobar modulos completados
        
        for (var m in usuarioAvance.modulos){
            usuarioAvance['modulos'][m]['completo'] = true;
            var lids = nutrifami.training.getLeccionesId(m);
            for (var lid in lids){
                if (!usuarioAvance['lecciones'][lids[lid]]){
                    usuarioAvance['modulos'][m]['completo'] = false;
                }else{
                    usuarioAvance['modulos'][m]['completados']++;
                    usuarioAvance['medallas']++;
                    
                }
            }
            usuarioAvance['modulos'][m]['porcentaje'] = parseInt((100 / usuarioAvance['modulos'][m]['totalLecciones'] ) * usuarioAvance['modulos'][m]['completados']);
        }
        
        for (var c in usuarioAvance.capacitaciones){
            usuarioAvance['capacitaciones'][c]['completo'] = true;
            var mids = nutrifami.training.getModulosId(c);
            for (var mid in mids){
                if (!usuarioAvance['modulos'][mids[mid]]['completo']){
                    usuarioAvance['capacitaciones'][c]['completo'] = false;
                }else{
                    usuarioAvance['capacitaciones'][c]['completados']++;
                    usuarioAvance['modulosTerminados']++;
                    
                }
            }
            usuarioAvance['capacitaciones'][c]['porcentaje'] = parseInt((100 / usuarioAvance['capacitaciones'][c]['totalModulos'] ) * usuarioAvance['capacitaciones'][c]['completados']);
        }
        
        usuarioAvance['puntos']=usuarioAvance['medallas']*100;
        usuarioAvance['porcentaje']=parseInt((100 / usuarioAvance['totalUnidades'] ) * usuarioAvance['medallas']);
        
        
        console.log(usuarioAvance);
        
        
    };
    
    service.getAvance = function(){
        return JSON.parse(localStorage.getItem('usuarioAvance'));
    };
    
    return service;
});