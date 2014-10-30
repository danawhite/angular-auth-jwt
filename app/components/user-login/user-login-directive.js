app.Directives.directive('userLogin', function(){
    return{
        restrict: 'E',
        templateUrl: 'components/user-login/user-login.html',
        controller: 'components.user-login.UserLoginController',
        controllerAs: 'userLoginCtrl'
    }
});