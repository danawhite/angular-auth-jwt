describe('directive:Navbar', function(){
    var $rootScope,
        scope,
        element;

    beforeEach(function(){
        module('angularJwt');

        inject(function($injector, $compile){
            $rootScope = $injector.get('$rootScope');
            scope = $rootScope.$new();

            element = '<navbar></navbar>';

            element = $compile(element)(scope);
            scope.$digest();
        })
    });

    describe('initialization', function(){
        it('should attach a navbar to the page with links', function(){
            var links = element.find('a');

            expect(links.length).toBeGreaterThan(0);
        })
    })
});