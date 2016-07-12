angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('login',{
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'SiteInfoController',
        authenticate: true
      })
      .state('delete-site', {
        url: '/delete-site/:id',
        controller: 'DeleteSiteController',
         authenticate: true

      })
      .state('locations', {
        url: '/locations/:id',
        templateUrl: 'views/locations.html',
        controller: 'LocationInfoController',
         authenticate: true

      })
      .state('delete-location', {
        url: '/delete-location/:id',
        controller: 'DeleteLocationController',
         authenticate: true

      })
      .state('messages', {
        url: '/messages/:id',
        templateUrl: 'views/messages.html',
        controller: 'MessageInfoController',
         authenticate: true

      })
      .state('delete-message', {
          url: '/delete-message/:id',
          controller: 'DeleteMessageController',
           authenticate: true

      })
       .state('assets', {
          url: '/assets/:id',
          templateUrl: 'views/assets.html',
          controller: 'AssetInfoController',
           authenticate: true

      })
       .state('delete-asset', {
          url: '/delete-asset/:id',
          controller: 'DeleteAssetController',
           authenticate: true

       })
       .state('forbidden',{
          url: '/forbidden',
          templateUrl: 'views/forbidden.html'

       })
    $urlRouterProvider.otherwise('login');

  }])
    //.run(['$rootScope', '$state',  function($rootScope, $state) {
     // $rootScope.$on('$stateChangeStart', function(event, next) {
   .run(['$rootScope', '$state', function ($rootScope, $state) {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    $rootScope.currentUser = user || null;
    $rootScope.$on('$stateChangeStart', function (event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('login');
      }
    });
  }]);












