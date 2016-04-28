// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//var LeaveTaking = angular.module('LeaveTaking', ['ionic', 'LeaveTaking.controllers', 'LeaveTaking.services', 'ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
var LeaveTaking = angular.module('LeaveTaking', ['ionic', 'ionic-timepicker','ionic-datepicker','standardTimeMeridian', 'ngMaterial','ngMaterialDatePicker'])
// var LeaveTaking = angular.module('LeaveTaking', ['ionic', 'ionic-timepicker','ionic-datepicker','standardTimeMeridian', 'ngMaterial', 'ngAnimate', 'ngAria','mdPickers'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $mdThemingProvider) {

    var customPrimary = {
        '50': '#9dcfff',
        '100': '#84c2ff',
        '200': '#6ab6ff',
        '300': '#51a9ff',
        '400': '#379dff',
        '500': '#1E90FF',
        '600': '#0483ff',
        '700': '#0077ea',
        '800': '#006ad0',
        '900': '#005db7',
        'A100': '#b7dbff',
        'A200': '#d0e8ff',
        'A400': '#eaf5ff',
        'A700': '#00509d'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#ff0b0b',
        '100': '#f10000',
        '200': '#d70000',
        '300': '#be0000',
        '400': '#a40000',
        '500': '#8B0000',
        '600': '#710000',
        '700': '#580000',
        '800': '#3e0000',
        '900': '#250000',
        'A100': '#ff2525',
        'A200': '#ff3e3e',
        'A400': '#ff5858',
        'A700': '#0b0000'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#db7373',
        '100': '#d65f5f',
        '200': '#d14a4a',
        '300': '#cc3636',
        '400': '#b92f2f',
        '500': '#A52A2A',
        '600': '#912525',
        '700': '#7c2020',
        '800': '#681a1a',
        '900': '#541515',
        'A100': '#e18787',
        'A200': '#e69c9c',
        'A400': '#ebb0b0',
        'A700': '#3f1010'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    // var customBackground = {
    //     '50': '#ffeb80',
    //     '100': '#ffe766',
    //     '200': '#ffe34d',
    //     '300': '#ffdf33',
    //     '400': '#ffdb1a',
    //     '500': '#FFD700',
    //     '600': '#e6c200',
    //     '700': '#ccac00',
    //     '800': '#b39600',
    //     '900': '#998100',
    //     'A100': '#ffef99',
    //     'A200': '#fff3b3',
    //     'A400': '#fff7cc',
    //     'A700': '#806c00'
    // };

    // var customBackground = {
    //     '50': '#ffb280',
    //     '100': '#ffa266',
    //     '200': '#ff934d',
    //     '300': '#ff8333',
    //     '400': '#ff741a',
    //     '500': '#ff6400',
    //     '600': '#e65a00',
    //     '700': '#cc5000',
    //     '800': '#b34600',
    //     '900': '#993c00',
    //     'A100': '#ffc199',
    //     'A200': '#ffd1b3',
    //     'A400': '#ffe0cc',
    //     'A700': '#803200'
    // };
    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#ffffff',
        '400': '#ffffff',
        '500': '#fff',
        '600': '#f2f2f2',
        '700': '#e6e6e6',
        '800': '#d9d9d9',
        '900': '#cccccc',
        'A100': '#ffffff',
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#bfbfbf'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

    $mdThemingProvider
      .theme('customTheme')
      .primaryPalette('customPrimary', {
        //'default': '600',
        //'hue-1': 'A700'
      })
      .accentPalette('customAccent', {
        //'default': '600'
      })
      .warnPalette('customWarn')
      .backgroundPalette('customBackground');

      $mdThemingProvider.alwaysWatchTheme(true);



  //$ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js      
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    //cache: false,
    url: '/tab',
    abstract: true,
    templateUrl: 'view/tabs.html',
    //controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    //cache: false,
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'view/tab-home.html',
        //controller: 'HomeCtrl'
      }
    }
  })
  .state('tab.add', {
    cache: false,
    url: '/add',
    views: {
      'tab-add': {
        templateUrl: 'view/tab-add.html',
        controller: 'AddCtrl'
      }
    }
  })

  .state('tab.sign', {
    cache: false,
    url: '/sign',
    views: {
      'tab-sign': {
        templateUrl: 'view/tab-sign.html',
        //controller: 'SignCtrl'
      }
    }
  })
  .state('tab.sign.unsign', {
    cache: false,
    url: '/sign/:param',
    views: {
      'tab-sign-unsign': {
        templateUrl: 'view/tab-sign.html',        
      }
    }
  })
  /*  
  .state('tab.report.myleave', {
    cache: false,
    url: '/reportMyLeave',
    templateUrl: 'view/tab-report-myleave.html',        
        controller: 'ReportMyLeaveCtrl'
  })
  */  
  .state('tab.report.unsign', {
    cache: false,
    url: '/report/:param',
    views: {
      'tab-report-unsign': {
        templateUrl: 'view/tab-report.html',        
      }
    }
  })
  .state('tab.report', {
    cache: false,
    url: '/report',
    views: {
      'tab-report': {
        templateUrl: 'view/tab-report.html',
        //controller: 'ReportCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
