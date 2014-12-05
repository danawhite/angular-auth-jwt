app.Directives.directive('navbar', function(){
    return{
        restrict: 'EA',
        templateUrl: 'components/navbar/navbar.html',
        controller: 'components.navbar.navbarController as navbarCtrl'
    }
});