'use strict';
 
    angular
        .module('RDash')
        .factory('AuthenticationService', Service);
 
    function Service($http, $localStorage) {
        var service = {};
 
        service.Login = Login;
        service.Logout = Logout;
 
        return service;
 
        function Login(username, password, callback) {
            $http.post('http://localhost:3000/auth', { username: username, password: password })
                .success(function (response) {
                    // login successful if there's a token in the response
                    if (response.USR_Groupe) {
                        // store username and token in local storage to keep user logged in between page refreshes
                        $localStorage.currentUser = { username: username, token: response.USR_Groupe };
 
                        // add jwt token to auth header for all requests made by the $http service
                        $http.defaults.headers.common.Authorization = 'USR_Groupe : ' + response.token;
 
                        // execute callback with true to indicate successful login
                        callback(true);
                    } else {
                        // execute callback with false to indicate failed login
                        callback(false);
                    }
                });
        }
 
        function Logout() {
            // remove user from local storage and clear http auth header
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
