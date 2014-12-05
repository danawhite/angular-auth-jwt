describe('controller:NavbarController', function(){
    var $rootScope,
        $scope,
        $location,
        navbarController,
        navbarVm,
        authService,
        AUTH_EVENTS,
        userService;

    beforeEach(function(){
        module('application', function($provide){
            $provide.constant('AUTH_EVENTS', { loginSuccess: 'loginSuccess'})
        });

        inject(function($injector){
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $location = $injector.get('$location');
            authService = $injector.get('view.login.services.authService.AuthService');
            userService = $injector.get('view.userlogin.services.user.UserService');
            AUTH_EVENTS = $injector.get('AUTH_EVENTS');
            navbarController = $injector.get('$controller')('components.navbar.NavbarController', {$location: $location, UserService: userService});
            navbarVm = navbarController;
        });

        $scope.$digest();
    })

    describe('initialization', function(){
        it('should have a defined scope', function(){
            expect($scope).toBeDefined();
        });

        it('should define $location service', function(){
            expect($location).toBeDefined();
        });

        it('should have a defined controller', function(){
            expect(navbarController).toBeDefined();
        });
    });

    describe('when user refreshes page', function(){
        it('should get the current user', function(){
            userService.getCurrentUser();
            expect(navbarVm.currentUser).toBeDefined();
        })

        it('should assign value returned from AuthService.getCurrentUser() to currentUser', function(){
            userService.getCurrentUser();
            expect(navbarVm.currentUser).toEqual(userFactory.getCurrentUser());
        })
    });

    describe('when sign out button is clicked', function(){
        it('should call AuthSErvice.logout()', function(){
            spyOn('authService', 'logout');
            navbarVm.logout();
            expect(authService.logout).toHaveBeenCalled();
        })
    })

    describe('when loginSuccess event is fired', function(){
        it('should update location to value passed on AUTH_EVENTS.loginSuccess', function(){
            spyOn(navbarVm, 'updateLocation').andCallThrough();
            var location = '/success';

            $rootScope.$emit(AUTH_EVENTS.loginSuccess, location);

            expect(navbarVm.updateLocation).toHaveBeenCalledWith(location);
        });
    })
})