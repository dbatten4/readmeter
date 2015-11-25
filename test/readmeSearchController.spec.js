describe('ReadMeSearchController', function() {
  beforeEach(module('ReadMeSearch'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('ReadMeSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user', function() {

    var httpBackend;
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend
      httpBackend
        .when("GET", "https://api.github.com/users/hello/repos")
        .respond(
        { items: items}
      );
    }));

    var items = [
      {
        "name": "Octocat"
      },
      {
        "name": "Boris-Bikes"
      }
    ];

  it('displays search results', function() {
      ctrl.searchTerm = 'hello';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });


});
