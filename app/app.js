var app = app || {};

app.Controllers = angular.module('bi.app.controllers', []);
app.Services = angular.module('bi.app.services', []);
app.Directives = angular.module('bi.app.directives', []);

angular.module('angularJwt', [
    'bi.app.controllers',
    'bi.app.services',
    'bi.app.directives',
    'ngRoute'
]);

angular.module('angularJwt')
    .factory('AuthInterceptor', [
        '$location',
        '$rootScope',
        '$q',
        '$window',
        'AUTH_EVENTS',
        'components.user-login.services.AuthTokenFactory',
        function($location, $rootScope, $q, $window, AUTH_EVENTS, AuthTokenFactory){
            return{
                request: function(config){
                    config.headers = config.headers || {};
                    // FIXME: May cause an error
                    if(AuthTokenFactory.getToken !== 'undefined'){
                        //config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                    }
                    return config;
                },
                response: function(response){
                    // successful response
                    return response;
                },
                requestError: function(rejection){
                    return rejection;
                },
                responseError: function(response){
                    if(response.status == 401){
                        console.dir(response);
//                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
//                        $window.alert('you are not authenticated');
//                        return;
//                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, {});
//                        return response || $q.when(response);
                        return $q.reject(response);
                    }
                    if(response.status == 403){
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
                    }
                    return $q.reject(response);
                }
            };
        }
    ])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })
    .constant('URL_PREFIX', 'http://localhost:8080')
    .config([
        '$httpProvider',
        function($httpProvider){
            $httpProvider.interceptors.push([
                '$injector',
                function($injector){
                    return $injector.get('AuthInterceptor');
                }
            ]);
        }])
    .config([
        '$httpProvider',
        function($httpProvider){
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers
                .common['X-Requested-With'];
        }])
    .config(
    [
        '$routeProvider',
        function($routeProvider){
            $routeProvider
                .when('/', {
                    templateUrl: 'view/main/main.html'
                })
                .when('/success', {
                    templateUrl: 'view/success/success.html',
                })
                .otherwise('/');
        }
    ])
    .run(
    [
        '$window',
        function($window){
            $rootScope.$on('$routeChangeStart', function(evt, next, current){
                if($window.localStorage['expiry'] === $filter('date')(new Date())){
                    // TODO move items into User object
                    $window.localStorage.removeItem('username');
                    $window.localStorage.removeItem('token');
                    $window.localStorage.removeItem('roles');
                    $window.localStorage.removeItem('isLoggedIn');
                }
            });
        }]);