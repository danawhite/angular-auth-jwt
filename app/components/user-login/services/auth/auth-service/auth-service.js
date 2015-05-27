export default ngModule => {
    ngModule.factory('AuthService', AuthService)

    AuthService.$inject = ['$http', '$q', 'UserFactory', 'Notifications'];

    var url = 'SOME_URL';

    function AuthService($http, $q, UserFactory, Notifications) {
        var AuthService = {};

        AuthService.authenticate = function(credentials){
            return $http({
                method: 'POST',
                url: url,
                data: {
                    userId: credentials.userId,
                    password: credentials.password
                },
                headers: { 'Content-Type', 'application/json'}
            })
                .success(function(){
                    UserFactory.createUser(data.token)
                })
                .error(function(){
                    // send error message
                })
        };

        AuthService.logout = function(){
            UserFactory.destroyUser();
        };

        // TODO: implement fully
        AuthService.isAuthorized = function(authorizedRoles){
            if(!angular.isArray(authorizedRoles)){
                authorizedRoles = [authorizedRoles];
            }
        }
    }
}