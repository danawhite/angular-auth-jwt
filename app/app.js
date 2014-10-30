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
        function($location, $rootScope, $q, $window, AUTH_EVENTS){
            return{
                request: function(config){
                    config.headers = config.headers || {};
                    // FIXME: May cause an error
                    if($window.localStorage.token){
                        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                    }
                    return config;
                },
                response: function(response){
                    // successful response
                    return response;
                },
                requestError: function(rejection){
                    // an error happened on the request
                    // if we can recover from the error
                    // we can return a new request or promise
                    // Otherwise, we can reject the next
                    // by returning a rejection
                    //return $q.reject(rejection)
                    return rejection;
                },
                responseError: function(response){
                    // an error happened on the request
                    // if we recover from the error,
                    // we can return a new response or promise
                    // Otherwise, we can reject the next by
                    // returning a rejection
                    // return $q.reject(rejection)
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
                }, true)
                .when('/dashboard', {
                    templateUrl: 'view/dashboard/dashboard.html',
                    access: {
                        loginRequired: true
                    }
                })
                .otherwise('/');
        }
    ])
    .run(
    [
        '$window',
        '$rootScope',
        '$log',
        '$filter',
        '$location',
        'view.login.services.authservice.AuthService',
        'view.userlogin.services.user.UserService',
        'AUTH_EVENTS',
        function($window, $rootScope, $log, $filter, $location, AuthService, UserService, AUTH_EVENTS){
            $rootScope.$on('$routeChangeStart', function(evt, next, current){
                if($window.localStorage['expiry'] === $filter('date')(new Date())){
                    // TODO move items into User object
                    $window.localStorage.removeItem('username');
                    $window.localStorage.removeItem('token');
                    $window.localStorage.removeItem('roles');
                    $window.localStorage.removeItem('isLoggedIn');
                }
                if(next.access.loginRequired && !$window.localStorage.token) {
//                          console.log(next.loadedTemplateUrl);
//                        console.log('token? ' + $window.localStorage.token);
//                        console.log('authenticated? ' + $window.localStorage.token);
                    $location.path('/');
                }else{
                    $log.info('login is not required');
//                        console.log('authenticated? ' + $window.localStorage.token);
                }
            });
        }]);