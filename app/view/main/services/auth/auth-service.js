app.Services.factory('view.main.services.authservice.AuthService',
    [
        '$http',
        'view.userlogin.services.user.UserService',
        function($http, UserService){
            var AuthService = {};

            AuthService.authenticate = function(credentials){
                return $http.post(SOME_URL + '/auth' + credentials)
                    .then(function(response){
                        UserService.createUser(response.data.token);
                    })
            };
            //AuthService.isAuthenticated = function(){
            //    return UserSer.userId !== null;
            //};

            AuthService.logout = function(){
                UserService.destroyUser();
                //$location.path('/');

            };

            return AuthService;
        }]);