app.Directives.directive('userLogin', UserLogin);

function UserLogin() {
    return{
        restrict: 'E',
        templateUrl: 'components/user-login/user-login.html',
        controller: 'components.user-login.UserLoginController',
        controllerAs: 'userLoginCtrl'
    }
};