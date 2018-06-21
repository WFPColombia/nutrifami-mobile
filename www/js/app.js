var dependencies = ['ionic', 'Authentication', 'satellizer', 'ngCordova', 'ngCookies', 'ionMDRipple', 'ionicLazyLoad', 'jett.ionic.filter.bar', 'pascalprecht.translate'];

var nutrifamiLogin = angular.module('Authentication', []);
var nf2 = angular.module('nfmobile', dependencies);

nf2.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicFilterBarConfigProvider, $compileProvider, $authProvider, $httpProvider, $translateProvider) {
    'use strict';
    console.log('App Config');
    $ionicConfigProvider.tabs.position('top');
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|ms-appx-web|ms-appdata):|data:image\//);

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    // Answer edited to include suggestions from comments
    // because previous version of code introduced browser-related errors

    //disable IE ajax request caching
    //$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


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

    // Multilanguaje Settings

    $translateProvider.useStaticFilesLoader({
        prefix: 'translations/locale-',
        suffix: '.json'
    }).preferredLanguage('es')
            .useLocalStorage()
            .useMissingTranslationHandlerLog();

    // Change the platform and redirectUri only if we're on mobile
    // so that development on browser can still work. 
    if (window.cordova) {
        console.log('is mobile');
        $authProvider.platform = 'mobile';
        commonConfig.redirectUri = 'http://usuarios.nutrifami.org';
        $authProvider.loginUrl = 'http://usuarios.nutrifami.org/api/token-auth/';
        $authProvider.signupUrl = 'http://usuarios.nutrifami.org/api/create-user/';
    } else {
        console.log('is not mobile');
        $authProvider.loginUrl = 'http://localhost:8000/api/token-auth/';
        $authProvider.signupUrl = 'http://localhost:8000/api/create-user/';
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

    $authProvider.tokenType = 'Token';

    $stateProvider.state('nc_home', {
        url: '/nc',
        cache: false,
        templateUrl: 'src/nc_home/nc_home.html',
        controller: 'ncHomeCtrl'

    });

    $stateProvider.state('nc_tutorial', {
        url: '/nc/tutorial',
        cache: false,
        templateUrl: 'src/nc_tutorial/nc_tutorial.html'
    });

    $stateProvider.state('nc_play', {
        url: '/nc/play',
        cache: false,
        templateUrl: 'src/nc_play/nc_play.html',
        controller: 'ncPlayCtrl'
    });


    $stateProvider.state('nc_cart', {
        url: '/nc/cart',
        cache: false,
        templateUrl: 'src/nc_cart/nc_cart.html',
        controller: 'ncCartCtrl'
    });


    $stateProvider.state('nc_end', {
        url: '/nc/end',
        cache: false,
        templateUrl: 'src/nc_end/nc_end.html',
        controller: 'ncEndCtrl'
    });

    // Organizados :)

    $stateProvider.state('nf', {
        url: '/app',
        abstract: true,
        templateUrl: 'src/nav/nav.html',
        controller: 'NavCtrl'
    });

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
        cache: false,
        templateUrl: 'src/auth_home/auth_home.html',
        controller: 'AuthHomeCtrl'
    });

    $stateProvider.state('auth_signup', {
        url: '/auth/signup',
        cache: false,
        templateUrl: 'src/auth_signup/auth_signup.html',
        controller: 'AuthSignupCtrl'
    });

    $stateProvider.state('registro2', {
        url: '/auth/registro/2',
        cache: false,
        templateUrl: 'src/auth_registro2/auth_registro2.html',
        controller: 'AuthRegistro2Ctrl'
    });

    $stateProvider.state('nf.auth_profile', {
        url: '/profile',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/auth_profile/auth_profile.html',
                controller: 'AuthProfileCtrl'
            }
        }
    });

    $stateProvider.state('nf.auth_profile_edit', {
        url: '/profile/edit',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/auth_profile_edit/auth_profile_edit.html',
                controller: 'AuthProfileEditCtrl'
            }
        }
    });

    $stateProvider.state('nf.progress', {
        url: '/progress',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/progress/progress.html',
                controller: 'ProgressCtrl'
            }
        }
    });

    $stateProvider.state('nf.recetas', {
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

    $stateProvider.state('nf.shopping_intro', {
        url: '/shopping/intro',
        views: {
            menuContent: {
                templateUrl: 'src/shopping_intro/shopping_intro.html',
                controller: 'ShoppingIntroCtrl'
            }
        }
    });

    $stateProvider.state('nf.shopping_home', {
        url: '/shopping',
        views: {
            menuContent: {
                templateUrl: 'src/shopping_home/shopping_home.html',
                controller: 'ShoppingHomeCtrl'
            }
        }
    });

    $stateProvider.state('shopping_group', {
        url: '/shopping/:group',
        templateUrl: 'src/shopping_group/shopping_group.html',
        controller: 'ShoppingGroupCtrl'
    });

    $stateProvider.state('nf.cap_home', {
        url: '/',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/cap_home/cap_home.html',
                controller: 'CapHomeCtrl'
            }
        }
    });

    $stateProvider.state('home-buscar', {
        url: '/app/buscar',
        cahe: false,
        templateUrl: 'src/home_buscar/home_buscar.html',
        controller: 'HomeBuscarCtrl'
    });

    $stateProvider.state('nf.tips', {
        url: '/tips',
        views: {
            'menuContent': {
                templateUrl: 'src/tips/tips.html',
                controller: 'TipsCtrl'
            }
        }
    });

    $stateProvider.state('tips_module', {
        url: '/tips/:module',
        templateUrl: 'src/tips_module/tips_module.html',
        controller: 'TipsModuleCtrl'
    });

    $stateProvider.state('nf.capacitator', {
        url: '/capacitator',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'src/capacitator/capacitator.html',
                controller: 'CapacitatorCtrl'
            }
        }
    });

    $stateProvider.state('nf.language', {
        url: '/language',
        cache: false,
        views: {
            menuContent: {
                templateUrl: 'src/language/language.html',
                controller: 'LanguageCtrl'
            }
        }
    });

    $stateProvider.state('nf.cap_capacitation', {
        url: '/:capacitation',
        cache: false,
        views: {
            menuContent: {
                templateUrl: 'src/cap_capacitation/cap_capacitation.html',
                controller: 'CapCapacitationCtrl'
            }
        }
    });

    $stateProvider.state('nf.cap_module', {
        url: '/:capacitation/:module',
        cache: false,
        views: {
            menuContent: {
                templateUrl: 'src/cap_module/cap_module.html',
                controller: 'CapModuleCtrl'
            }
        }
    });

    $stateProvider.state('cap_unit', {
        url: '/:capacitation/:module/:lesson/:unit',
        cache: false,
        templateUrl: 'src/cap_unit/cap_unit.html',
        controller: 'CapUnitCtrl'
    });

    $stateProvider.state('cap_unit_end', {
        url: '/:capacitation/:module/:lesson/:unit/end',
        cache: false,
        templateUrl: 'src/cap_unit_end/cap_unit_end.html',
        controller: 'CapUnitEndCtrl'
    });

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'src/about/about.html'
    });


    $ionicFilterBarConfigProvider.backdrop(false);
    $ionicFilterBarConfigProvider.placeholder('Buscar receta');
    $ionicFilterBarConfigProvider.search('ion-search');


    // Redirecciona a la capacitación si la URL solicitada no existe
    $urlRouterProvider.otherwise('/app/');
});

nf2.run(function ($ionicPlatform, $rootScope, $location, $http, CapacitationService, $window, $translate) {
    console.log('App Run');

    //Deshabilitamos el boton de ir atrás del Hardware de Android
    $ionicPlatform.registerBackButtonAction(function (e) {
        //do your stuff
        e.preventDefault();
    }, 101);

    $rootScope.globals = JSON.parse(localStorage.getItem('globals')) || {};

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

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

    CapacitationService.initClient(function () {

    });

    // Language settings
    var stored_lang_key = localStorage.getItem('NG_TRANSLATE_LANG_KEY');
    if (stored_lang_key) {
        $rootScope.lang = stored_lang_key;
        $translate.use(stored_lang_key);
    } else {
        var locale = $window.navigator.language || $window.navigator.userLanguage;
        var lang = locale.substring(0, 2);
        $rootScope.lang = lang;
        console.log($rootScope.lang);
        $translate.use(lang);
    }

    $ionicPlatform.ready(function () {

        ionic.Platform.fullScreen(true, false); //Fullscreen en ios, verificar para Android
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            if (device.platform !== "windows") {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if (window.cordova) {
            $rootScope.BASE_URL = 'http://usuarios.nutrifami.org/';
            $rootScope.isMobile = true;
            if (device.platform === "Android") {
                console.log("isAndroid");
                $rootScope.TARGETPATH = cordova.file.externalApplicationStorageDirectory;
                $rootScope.TARGETPATH_AUDIO = cordova.file.externalApplicationStorageDirectory;
                $rootScope.ICON_DESCARGA = 'ion-android-download';
                $rootScope.ICON_AUDIO = 'ion-android-volume-up';
                window.addEventListener("native.hidekeyboard", function () {
                    StatusBar.hide();
                    window.AndroidFullScreen.immersiveMode(false, false);
                });
            } else if (device.platform === "windows") {
                console.log('is Windows');
                $rootScope.TARGETPATH = cordova.file.dataDirectory;
                $rootScope.TARGETPATH_AUDIO = cordova.file.dataDirectory;
                $rootScope.ICON_DESCARGA = 'ion-android-download';
                $rootScope.ICON_AUDIO = 'ion-volume-high';
            } else {
                console.log("Is iPad or iOS");
                $rootScope.TARGETPATH = cordova.file.dataDirectory;
                resolveLocalFileSystemURL($rootScope.TARGETPATH, function (entry) {
                    $rootScope.TARGETPATH_AUDIO = entry.toInternalURL();
                    console.log('cdvfile URI: ' + entry.toInternalURL());
                });
                $rootScope.ICON_DESCARGA = 'ion-ios-cloud-download-outline';
                $rootScope.ICON_AUDIO = 'ion-ios-volume-high';

            }

        } else {
            $rootScope.BASE_URL = 'http://localhost:8000/';
            $rootScope.TARGETPATH = "https://s3.amazonaws.com/nutrifami/training/images/";
            $rootScope.TARGETPATH_AUDIO = "https://s3.amazonaws.com/nutrifami/";
            $rootScope.ICON_DESCARGA = 'ion-ios-cloud-download-outline';
            $rootScope.ICON_AUDIO = 'ion-ios-volume-high';
            $rootScope.isMobile = false;
        }
    });
});