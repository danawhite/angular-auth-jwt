app.Controllers.controller('components.user-login.UserLoginController', [
    '$rootScope',
    '$window',
    '$log',
    'AUTH_EVENTS',
    'USER_ROLES',
    'view.main.services.authservice.AuthService',
    function($rootScope, $window, $log, AUTH_EVENTS, USER_ROLES, AuthService){

        var vm = this;

        vm.user = {
            username: '',
            password: ''
        };

        vm.currentUser = null;
        vm.userRoles = USER_ROLES;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.isAuthenticated = AuthService.isAuthenticated;

        vm.authenticate = function(credentials) {
            AuthService.authenticate(credentials).then(function () {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {
                    username: credentials.username
                }), function () {
                    $rootScope.broadcast(AUTH_EVENTS.loginFailed);
                };
            });
        };
    }
]);