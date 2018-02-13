'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/tables.html',
                controller: 'MasterCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
                
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html',
                controller: 'MasterCtrl',
                controllerAs: 'vm'
            });
    }
]).run(['$rootScope', '$http', '$location', '$localStorage',
	
    function ($rootScope, $http, $location, $localStorage) {
	    // keep user logged in after page refresh
	    if ($localStorage.currentUser) {
	        $http.defaults.headers.common.Authorization = 'USR_Groupe :  ' + $localStorage.currentUser.token;
	    }
	
	    // redirect to login page if not logged in and trying to access a restricted page
	    $rootScope.$on('$locationChangeStart', function (event, next, current) {
	        var publicPages = ['/login'];
	        var restrictedPage = publicPages.indexOf($location.path()) === -1;
	        if (restrictedPage && !$localStorage.currentUser) {
	            $location.path('/login');
	        }
	    });
	}
	
	]);