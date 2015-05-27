app.Services.factory('components.user-login.services.AuthTokenFactory', function($window){
        var AuthTokenFactory = {};

        var store = $window.localStorage;
        var key = 'auth-token;';

        AuthTokenFactory.getToken = function(){
            return store.getItem(key);
        };

        AuthTokenFactory.setToken = function(token){
            if(token){
                store.setItem(key, JSON.stringify(token));
            }else{
                store.removeItem(key);
            }

        };

        return AuthTokenFactory;
    });