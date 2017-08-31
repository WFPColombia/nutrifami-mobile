dependencies = ['ionic', 'Authentication', 'ngCordova', 'ionMDRipple', 'ionicLazyLoad'];


var nutrifamiLogin = angular.module('Authentication', []);
var nutrifamiMobile = angular.module('NutrifamiMobile', dependencies);

nutrifamiMobile.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
    'use strict';
    $ionicConfigProvider.tabs.position('top');

    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile):|data:image\//);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file):/);


    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    });



    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/template/menu.tpl.html',
        controller: 'NavController'
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

    $stateProvider.state('sobre', {
        url: '/sobre',
        templateUrl: 'src/sobre/sobre.html',
        controller: 'SobreCtrl'
    });

    $stateProvider.state('app.capacitacion', {
        url: '/capacitacion',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/capacitacion/capacitacion.html',
                controller: 'CapacitacionCtrl'
            }
        }

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
        cache: true,
        views: {
            'menuContent': {
                templateUrl: 'src/recetas/recetas.html',
                controller: 'RecetasCtrl'
            }
        }
    });

    $stateProvider.state('receta', {
        url: '/app/recetas/receta/:id',
        templateUrl: 'src/receta/receta.html',
        controller: 'RecetaCtrl'
    });







    // Redirecciona a la capacitación si la URL solicitada no existe
    $urlRouterProvider.otherwise('/app/capacitacion');
});

nutrifamiMobile.run(function($ionicPlatform, $rootScope, $location, $cordovaFileTransfer, $ionicHistory) {

    //Deshabilitamos el boton de ir atrás del Hardware de Android
    $ionicPlatform.registerBackButtonAction(function(e) {
        //do your stuff
        e.preventDefault();
    }, 101);


    $rootScope.globals = JSON.parse(localStorage.getItem('globals')) || {};

    nutrifami.getSessionId();
    $rootScope.$on('$locationChangeStart', function(event, next, current) {

        console.log($location.path());

        //Redirecciona a la pagina de preload si estaba la app cerrada
        if ($location.path() === "") {
            $rootScope.RELOAD = true; //Variable usada para recargar la información de usuario 
            $location.path('/preload');
        }
        // Redirecciona a la pagina de login si el usuario no está logeado
        if ($location.path() !== '/login' && !$rootScope.globals.currentUser && $location.path() !== '/preload') {
            $location.path('/login');
        }

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