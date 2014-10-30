app.Services.factory('view.main.services.authservice.AuthService',
    [
        '$window',
        '$http',
        '$location',
        'view.userlogin.services.user.UserService',
        'AUTH_EVENTS',
        function($window, $http, $location, UserService, AUTH_EVENTS){
            var AuthService = {};

            AuthService.authenticate = function(credentials){
                return $http.post(SOME_URL + '/auth' + credentials)
                    .then(function(response){
                        UserService.createUser(response.data.token);
                    })
            };

            AuthService.isAuthenticated = function(){
                return Session.userId !== null;
            };

            AuthService.logout = function(){
                UserService.destroy();
                $location.path('/');

            };

            return AuthService;
        }]);