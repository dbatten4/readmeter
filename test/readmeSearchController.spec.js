describe('ReadMeSearchController', function() {
  beforeEach(module('ReadMeter'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('ReadMeSearchController');
  }));

  it('initialises with an empty search result and term', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });

  describe('when searching for a user\'s repos', function() {

    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend
      httpBackend
        .expectGET('https://api.github.com/users/hello/repos?access_token=' + gitAccessToken)
        .respond(
        { items: items}
      );
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    var items = [
      {
        "name": "Octocat"
      },
      {
        "name": "Boris-Bikes"
      }
    ];

    it('displays search results', function() {
      ctrl.username = 'hello';
      ctrl.doSearch();
      httpBackend.flush();
      expect(ctrl.repoSearchResult.items).toEqual(items);
    });

  });

  describe('when searching for a repo with a readme', function() {

    var httpBackend;

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend
      httpBackend
        .expectGET('https://api.github.com/repos/hello/testrepo/readme?access_token=' + gitAccessToken)
        .respond(
          { items: items}
      );
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    var items = [
      {
        "name": "testrepo",
        "size": 100,
        "html_url": "https://github.com/hello/testrepo/readme"
      }
    ];

    it("displays search results", function() {
      ctrl.username = "hello";
      ctrl.gitRepoNames = ["testrepo"];
      ctrl.lookupNamesPromises();
      httpBackend.flush();
      expect(ctrl.readmeSearchResult.items).toEqual(items);
    });

  });

});
