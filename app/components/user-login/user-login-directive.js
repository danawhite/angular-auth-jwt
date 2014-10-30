app.Directives.directive('userLogin', function(){
    return{
        restrict: 'E',
        templateUrl: 'components/userLogin/userLogin.html',
        controller: 'components/userLogin/user'
    }
});