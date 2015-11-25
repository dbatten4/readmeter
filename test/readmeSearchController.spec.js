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

});
