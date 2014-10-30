app.Services.factory('view.userlogin.services.user.UserService',
    [
        '$window',
        '$rootScope',
        'AUTH_EVENTS',
        'components.user-login.services.AuthTokenFactory',
        function($window, $rootScope, AUTH_EVENTS, AuthTokenFactory){

            var UserService = {};

            UserService.createUser = function(token){
                UserService.claims = angular.fromJson($window.atob(token.split('.')[1]));
                UserService.user = User.claims['userId'];
                UserService.token = token || null;
                UserService.roles = UserService.claims['roles'];
                UserService.expiry = UserService.claims['expiry'];
                $window.localStorage.setItem('token', token);
                $window.localStorage.setItem('userID', UserService.user);
                $window.localStorage.setItem('roles', UserService.roles);
                $window.localStorage.setItem('expiry', UserService.expiry);
            };

            UserService.destroy = function(){
                UserService.token = null;
                UserService.userId = null;
                UserService.role = null;
                UserService.expiry = null;
                $window.localStorage.removeItem('token');
                $window.localStorage.removeItem('userId');
                $window.localStorage.removeItem('roles');
                $window.localStorage.removeItem('expiry');
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess, {
                    username: ''
                });
            };

            return UserService;
        }]);