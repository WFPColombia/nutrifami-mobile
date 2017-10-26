dependencies = ['ionic', 'Authentication', 'ngCordova', 'ionMDRipple', 'ionicLazyLoad', 'jett.ionic.filter.bar', 'satellizer'];


var nutrifamiLogin = angular.module('Authentication', []);
var nutrifamiMobile = angular.module('NutrifamiMobile', dependencies);

nutrifamiMobile.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider, $compileProvider, $authProvider) {
    'use strict';

    $ionicConfigProvider.tabs.position('top');

    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile):|data:image\//);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file):/);

    var commonConfig = {
        popupOptions: {
            location: 'no',
            toolbar: 'yes',
            width: window.screen.width,
            height: window.screen.height
        }
    };

    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
        console.log("Is app!!")
        commonConfig.redirectUri = 'http://localhost:8100/';
    }

    $authProvider.facebook(angular.extend({}, commonConfig, {
        clientId: '277975186032137',
        url: 'http://localhost:8000/api/login/social/token_user/facebook'

    }));

    $authProvider.google({
        url: "http://localhost:8000/api/login/social/token_user/google-oauth2",
        clientId: '898085701705-07ja94k2e3r3b81oqg2baih6q63ih8i3.apps.googleusercontent.com',
        redirectUri: "http://localhost:8100/"
    });

    $authProvider.authToken = 'Token';


    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/template/menu.tpl.html',
        controller: 'NavController'
    });

    $stateProvider.state('app.perfil', {
        url: '/perfil',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/perfil.html',
                controller: 'PerfilController'
            }
        }
    });

    $stateProvider.state('app.editarPerfil', {
        url: '/editar-perfil',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/editarPerfil.html',
                controller: 'EditarPerfilController'
            }
        }
    });

    $stateProvider.state('app.misComprasIntro', {
        url: '/mis-compras/intro',
        views: {
            'menuContent': {
                templateUrl: 'views/mis-compras/mc_intro.html',
                controller: 'mc_introCtrl'
            }
        }
    });

    $stateProvider.state('app.compras', {
        url: '/mis-compras',
        views: {
            'menuContent': {
                templateUrl: 'views/mis-compras/mc_home.html',
                controller: 'mc_homeCtrl'
            }
        }
    });

    $stateProvider.state('comprasGrupo', {
        url: '/mis-compras/:grupo',
        templateUrl: 'views/mis-compras/mc_grupo.html',
        controller: 'mc_grupoCtrl'
    });



    $stateProvider.state('app.progreso', {
        url: '/progreso',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/progreso.html',
                controller: 'ProgresoController'
            }
        }
    });

    $stateProvider.state('nc', {
        url: '/nutricompra',
        cache: false,
        templateUrl: 'views/nutricompra/nc_home.html',
        controller: 'nc_homeController'
    });

    $stateProvider.state('nc_como', {
        url: '/nutricompra/como-jugar',
        cache: false,
        templateUrl: 'views/nutricompra/nc_comoJugar.html',
        controller: 'nc_comoJugarController'
    });

    $stateProvider.state('nc_jugar', {
        url: '/nutricompra/jugar',
        cache: false,
        templateUrl: 'views/nutricompra/nc_jugar.html',
        controller: 'nc_jugarController'
    });


    $stateProvider.state('nc_resumen', {
        url: '/nutricompra/jugar/resumen',
        cache: false,
        templateUrl: 'views/nutricompra/nc_resumen.html',
        controller: 'nc_jugarResumenController'
    });


    $stateProvider.state('nc_terminar', {
        url: '/nutricompra/jugar/terminar',
        cache: false,
        templateUrl: 'views/nutricompra/nc_terminar.html',
        controller: 'nc_jugarTerminarController'
    });


    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });



    // Organizados :)

    $stateProvider.state('preload', {
        url: '/preload',
        templateUrl: 'src/preload/preload.html',
        controller: 'PreloadCtrl'
    });

    $stateProvider.state('intro', {
        url: '/intro',
        templateUrl: 'src/intro/intro.html',
        controller: 'IntroCtrl'
    });

    $stateProvider.state('auth', {
        url: '/auth',
        templateUrl: 'src/auth_home/auth_home.html',
        controller: 'AuthHomeCtrl'
    });

    $stateProvider.state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'src/auth_login/auth_login.html',
        controller: 'AuthLoginCtrl'
    });

    $stateProvider.state('registro', {
        url: '/registro',
        templateUrl: 'src/auth_registro/auth_registro.html',
        controller: 'AuthRegistroCtrl'
    });

    $stateProvider.state('registro2', {
        url: '/registro/2',
        templateUrl: 'src/auth_registro2/auth_registro2.html',
        controller: 'AuthRegistro2Ctrl'
    });



    $stateProvider.state('app.home', {
        url: '/',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/home/home.html',
                controller: 'HomeCtrl'
            }
        }
    });

    $stateProvider.state('app.capacitacion', {
        url: '/:capacitacion',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/capacitacion/capacitacion.html',
                controller: 'CapacitacionCtrl'
            }
        }
    });

    $stateProvider.state('app.modulo', {
        url: '/capacitacion/:modulo',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'views/modulo.html',
                controller: 'ModuloController'
            }
        }
    });

    $stateProvider.state('unidad', {
        url: '/capacitacion/:modulo/:leccion/:unidad',
        cache: false,
        templateUrl: 'views/unidad.html',
        controller: 'UnidadController'
    });

    $stateProvider.state('leccionTerminada', {
        url: '/capacitacion/:modulo/:leccion/:unidad/leccion-terminada',
        cache: false,
        templateUrl: 'views/leccionTerminada.html',
        controller: 'LeccionTerminadaController'
    });

    $stateProvider.state('sobre', {
        url: '/sobre',
        templateUrl: 'src/sobre/sobre.html',
        controller: 'SobreCtrl'
    });

    $stateProvider.state('app.tips', {
        url: '/tips',
        views: {
            'menuContent': {
                templateUrl: 'src/tips/tips.html',
                controller: 'TipsCtrl'
            }
        }
    });

    $stateProvider.state('tipsModulo', {
        url: '/tips/:modulo',
        templateUrl: 'src/tips-modulo/tips-modulo.html',
        controller: 'TipsModuloCtrl'
    });

    $stateProvider.state('app.recetas', {
        url: '/recetas',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/recetas/recetas.html',
                controller: 'RecetasCtrl'
            }
        }
    });

    $stateProvider.state('recetas-buscar', {
        url: '/app/recetas/buscar',
        cahe: false,
        templateUrl: 'src/recetas-buscar/recetas-buscar.html',
        controller: 'RecetasBuscarCtrl'
    });

    $stateProvider.state('receta', {
        url: '/app/recetas/receta/:receta_id',
        cahe: false,
        templateUrl: 'src/receta/receta.html',
        controller: 'RecetaCtrl'
    });

    $ionicFilterBarConfigProvider.backdrop(false);
    $ionicFilterBarConfigProvider.placeholder('Buscar receta');
    $ionicFilterBarConfigProvider.search('ion-search');


    // Redirecciona a la capacitación si la URL solicitada no existe
    $urlRouterProvider.otherwise('/app/');
});

nutrifamiMobile.run(function($ionicPlatform, $rootScope, $location, $cordovaFileTransfer, $ionicHistory) {

    //Deshabilitamos el boton de ir atrás del Hardware de Android
    $ionicPlatform.registerBackButtonAction(function(e) {
        //do your stuff
        e.preventDefault();
    }, 101);


    $rootScope.globals = JSON.parse(localStorage.getItem('globals')) || {};

    console.log($rootScope.globals);

    nutrifami.getSessionId();
    $rootScope.$on('$locationChangeStart', function(event, next, current) {

        console.log($location.path());

        //Redirecciona a la pagina de preload si estaba la app cerrada
        if ($location.path() === "") {
            $rootScope.RELOAD = true; //Variable usada para recargar la información de usuario 
            $location.path('/preload');
        }
        // Redirecciona a la pagina de auth si el usuario no está logeado
        /*if (!$rootScope.globals.currentUser) {
            if ($location.path() !== '/auth' && $location.path() !== '/preload' && $location.path() !== '/login') {
                $location.path('/auth');
            }
        }*/


    });

    $ionicPlatform.ready(function() {
        ionic.Platform.fullScreen(true, false); //Fullscreen en ios, verificar para Android

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if (window.cordova) {

            if (ionic.Platform.isAndroid()) {
                $rootScope.TARGETPATH = cordova.file.externalApplicationStorageDirectory;
                window.addEventListener("native.hidekeyboard", function() {
                    StatusBar.hide();
                    window.AndroidFullScreen.immersiveMode(false, false);
                });
            } else if (ionic.Platform.isIPad() || ionic.Platform.isIOS()) {
                console.log("Is iPad or iOS");
                $rootScope.TARGETPATH = cordova.file.dataDirectory;;
            }

        } else {
            $rootScope.TARGETPATH = "https://s3.amazonaws.com/nutrifami/";
        }
    });
});