app.Controllers.controller('AppController',
    [
        '$rootScope',
        'AUTH_EVENTS',
        'view.main.services.user.UserService',
        function($rootScope, AUTH_EVENTS, UserService){

            var vm = this;

            vm.isLoggedIn = UserService.userIsAuthenticated();
            vm.authFailed = true;

            $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
                vm.isLoggedIn = true;
            });

            $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
                vm.isLoggedOut = true;
            });
}]);