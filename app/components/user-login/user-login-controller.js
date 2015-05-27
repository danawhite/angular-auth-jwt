app.Controllers.controller('components.user-login.UserLoginController', UserLoginController);

UserLoginController.$inject = [
'$rootScope',
'AUTH_EVENTS',
'view.main.services.authservice.AuthService'
];

function UserLoginController($rootScope, AUTH_EVENTS, AuthService){

    var login = this;

    login.user = {
        username: '',
        password: ''
    };

    login.currentUser = null;
    login.isAuthorized = AuthService.isAuthorized;
    login.isAuthenticated = AuthService.isAuthenticated;

    login.authenticate = function(credentials) {
        AuthService.authenticate(credentials).then(function(data) {
            $rootScope.$emit(AUTH_EVENTS.loginSuccess, {
                username: credentials.username
            }), function () {
                $rootScope.$emit(AUTH_EVENTS.loginFailed);
            };
        });
    };
}