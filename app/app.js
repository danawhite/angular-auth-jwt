var app = app || {};

app.Controllers = angular.module('bi.app.controllers', []);
app.Services = angular.module('bi.app.services', []);
app.Directives = angular.module('bi.app.directives', []);

angular.module('angularJwt', [
    'bi.app.controllers',
    'bi.app.services',
    'bi.app.directives'
])
.config([
        '$routeProvider',
        function($routeProvider){
            $routeProvider
                .when('/', {
                    templateUrl: 'view/main/main.html'
                })
        }
    ])