app.Controllers.controller('components.user-login.UserLoginController', [
    '$rootScope',
    'AUTH_EVENTS',
    'view.main.services.authservice.AuthService',
    function($rootScope, $log, AUTH_EVENTS, AuthService){

        var vm = this;

        vm.user = {
            username: '',
            password: ''
        };

        vm.currentUser = null;
        vm.isAuthorized = AuthService.isAuthorized;
        vm.isAuthenticated = AuthService.isAuthenticated;

        vm.authenticate = function(credentials) {
            AuthService.authenticate(credentials).then(function () {
                $rootScope.$emit(AUTH_EVENTS.loginSuccess, {
                    username: credentials.username
                }), function () {
                    $rootScope.$emit(AUTH_EVENTS.loginFailed);
                };
            });
        };
    }
]);