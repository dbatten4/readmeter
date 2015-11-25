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
      expect(ctrl.searchResult.items).toEqual(items);
    });
  });


});
