export default ngModule => {
    ngModule.factory('UserFactory', UserFactory);

    UserFactory.$inject = [];

    function UserFactory(){

        var store = $window.localStorage;

        UserFactory.createUser = createUser;
    }

    function createUser(token) {
        if(token !== null) {
            UserFactory.claims = angular.fromJSON($window.atob(token.split('.')[1]))
            UserFactory.username = UserFactory.claims['userId'];
            UserFactory.roles = UserFactory.claims['roles'];
            UserFactory.isLoggedIn = true;

            store.setItem('token', token);
            store.setItem('username', UserFactiry.username);

        }
    }
}