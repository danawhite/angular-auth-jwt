describe('controller:AppController', function(){
    var scope,
        $rootScope,
        service;

    beforeEach(function(){
        module('angularJwt');

        inject(function($injector, _service_){
            $rootScope = $injector.get('$rootScope');
            scope = $rootScope.$new();
            service = _service_;
        })
    });

    //beforeEach(inject(function($injector){
    //    $rootScope = $injector.get('$rootScope');
    //    scope = $rootScope.$new();
    //}));

    it('should have a defined scope', function(){
        expect(service).toBeDefined();
    });

    it('should assert something', function(){
        expect(false).not.toEqual(false);
    })
});