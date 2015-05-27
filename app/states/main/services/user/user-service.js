app.Services.factory('view.userlogin.services.user.UserService',
    [
        '$window',
        '$rootScope',
        'AUTH_EVENTS',
        function($window, $rootScope, AUTH_EVENTS){

            var UserService = {};

            var store = $window.localStorage;

            UserService.createUser = function(token){
                UserService.claims = angular.fromJson($window.atob(token.split('.')[1]));
                UserService.user = UserService.claims['userId'];
                UserService.token = token || null;
                UserService.roles = UserService.claims['roles'];
                UserService.expiry = UserService.claims['expiry'];
                store.setItem('token', token);
                store.setItem('userID', UserService.user);
                store.setItem('roles', UserService.roles);
                store.setItem('expiry', UserService.expiry);
            };

            UserService.userIsAuthenticated = function(){
                return !!store.getItem('token');
            };

            UserService.getCurrentUser = function(){
                return store.getItem('username');
            };

            UserService.getItem = function(key){
                return store.getItem(key);
            };

            UserService.setItem = function(key, value){
                if(!key){
                    return;
                }
                store.setItem(key, value);
            };

            UserService.destroyUser = function(){
                UserService.token = null;
                UserService.userId = null;
                UserService.role = null;
                UserService.expiry = null;
                store.removeItem('token');
                store.removeItem('userId');
                store.removeItem('roles');
                store.removeItem('expiry');
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, {
                    username: ''
                });
            };

            function createUser(){

            }

            function userIsAuthenticated(){

            }

            function getCurrentUser(){

            }

            function getItem(){

            }

            function setItem(){

            }

            function destroyUser(){

            }

            return UserService;
        }]);