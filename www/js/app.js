dependencies = ['ionic', 'Authentication', 'ngCordova', 'ionMDRipple', 'ionicLazyLoad', 'jett.ionic.filter.bar', 'satellizer'];


var nutrifamiLogin = angular.module('Authentication', []);
var nutrifamiMobile = angular.module('NutrifamiMobile', dependencies);

nutrifamiMobile.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider, $compileProvider, $authProvider, $httpProvider) {
    'use strict';

    $ionicConfigProvider.tabs.position('top');
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile):|data:image\//);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file):/);

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


    // Configuration common for all providers.
    var commonConfig = {
        // Popup should expand to full screen with no location bar/toolbar.
        popupOptions: {
            location: 'no',
            toolbar: 'no',
            width: window.screen.width,
            height: window.screen.height
        }
    };
    
    //$authProvider.baseUrl = 'http://usuarios.nutrifami.org/';
    //$authProvider.loginUrl = 'http://usuarios.nutrifami.org/api-token-auth/';
    $authProvider.loginUrl = 'http://localhost:8000/api/token-auth/';
    $authProvider.signupUrl = 'http://localhost:8000/api/usuarios/';

    // Change the platform and redirectUri only if we're on mobile
    // so that development on browser can still work. 
    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid() || ionic.Platform.platform() === 'linux') {
        $authProvider.platform = 'mobile';
        commonConfig.redirectUri = 'http://usuarios.nutrifami.org';
    }
    
    
    // Configure Facebook login.
    $authProvider.facebook(angular.extend({}, commonConfig, {
        clientId: '126883721233688',
        url: 'http://usuarios.nutrifami.org/api/login/social/token_user/facebook',
        responseType: 'token'
    }));


    $authProvider.google({
        url: "http://usuarios.nutrifami.org/api/login/social/token_user/google-oauth2",
        clientId: '898085701705-07ja94k2e3r3b81oqg2baih6q63ih8i3.apps.googleusercontent.com',
        redirectUri: "http://usuarios.nutrifami.org/"
    });

    $authProvider.authToken = 'Token';


    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'views/template/menu.tpl.html',
        controller: 'NavController'
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
        url: '/auth/login',
        cache: false,
        templateUrl: 'src/auth_login/auth_login.html',
        controller: 'AuthLoginCtrl'
    });

    $stateProvider.state('registro', {
        url: '/auth/registro',
        templateUrl: 'src/auth_registro/auth_registro.html',
        controller: 'AuthRegistroCtrl'
    });

    $stateProvider.state('registro2', {
        url: '/auth/registro/2',
        templateUrl: 'src/auth_registro2/auth_registro2.html',
        controller: 'AuthRegistro2Ctrl'
    });

    $stateProvider.state('app.perfil', {
        url: '/perfil',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/auth_perfil/auth_perfil.html',
                controller: 'AuthPerfilCtrl'
            }
        }
    });
    
    $stateProvider.state('app.perfil_editar', {
        url: '/editar-perfil',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/auth_perfil_editar/auth_perfil_editar.html',
                controller: 'AuthPerfilEditarCtrl'
            }
        }
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

    $stateProvider.state('home-buscar', {
        url: '/app/buscar',
        cahe: false,
        templateUrl: 'src/home_buscar/home_buscar.html',
        controller: 'HomeBuscarCtrl'
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
        url: '/:capacitacion/:modulo',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/modulo/modulo.html',
                controller: 'ModuloCtrl'
            }
        }
    });

    $stateProvider.state('unidad', {
        url: '/:capacitacion/:modulo/:leccion/:unidad',
        cache: false,
        templateUrl: 'src/unidad/unidad.html',
        controller: 'UnidadCtrl'
    });

    $stateProvider.state('leccionTerminada', {
        url: '/:capacitacion/:modulo/:leccion/:unidad/leccion-terminada',
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



    $ionicFilterBarConfigProvider.backdrop(false);
    $ionicFilterBarConfigProvider.placeholder('Buscar receta');
    $ionicFilterBarConfigProvider.search('ion-search');


    // Redirecciona a la capacitación si la URL solicitada no existe
    $urlRouterProvider.otherwise('/app/');
});

nutrifamiMobile.run(function ($ionicPlatform, $rootScope, $location, $cordovaFileTransfer, $ionicHistory) {

    //Deshabilitamos el boton de ir atrás del Hardware de Android
    $ionicPlatform.registerBackButtonAction(function (e) {
        //do your stuff
        e.preventDefault();
    }, 101);


    $rootScope.globals = JSON.parse(localStorage.getItem('globals')) || {};

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log();

        //Guarda la información de usuario activo en el rootScope
        $rootScope.usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo')) || {};

        //Redirecciona a la pagina de preload si estaba la app cerrada
        if ($location.path() === "") {
            $location.path('/preload');
        }
        // Redirecciona a la pagina de auth si el usuario no está logeado e intenta ir a una página no autorizada
        if (!$rootScope.globals.currentUser) {
            var url = $location.path().substring(0, 5) // Tomamos los primeros 5 caracteres para hacer la validadción de las paginas
            if (url !== '/auth' && url !== '/prel') {
                $location.path('/auth');
            }
        }
    });

    $ionicPlatform.ready(function () {
        ionic.Platform.fullScreen(true, false); //Fullscreen en ios, verificar para Android

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }

        console.log(ionic.Platform.platform());

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if (window.cordova) {
            if (device.platform == "Android") {
                console.log("isAndroid");
                $rootScope.TARGETPATH = cordova.file.externalApplicationStorageDirectory;
                $rootScope.ICON_DESCARGA = 'ion-android-download';
                $rootScope.ICON_AUDIO = 'ion-android-volume-up';
                window.addEventListener("native.hidekeyboard", function () {
                    StatusBar.hide();
                    window.AndroidFullScreen.immersiveMode(false, false);
                });
            } else {
                console.log("Is iPad or iOS");
                $rootScope.TARGETPATH = cordova.file.dataDirectory;
                $rootScope.ICON_DESCARGA = 'ion-ios-cloud-download-outline';
                $rootScope.ICON_AUDIO = 'ion-ios-volume-high';
                
            }

        } else {
            $rootScope.TARGETPATH = "https://s3.amazonaws.com/nutrifami/";
            $rootScope.ICON_DESCARGA = 'ion-ios-cloud-download-outline';
            $rootScope.ICON_AUDIO = 'ion-ios-volume-high';
        }
    });
});