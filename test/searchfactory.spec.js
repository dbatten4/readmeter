describe('factory: RepoSearch', function() {

  var search;

  var items = [
    {
      "name": "Octocat"
    },
    {
      "name": "Boris-Bikes"
    }
  ];

  beforeEach(module('ReadMeter'));

  beforeEach(inject(function(RepoSearch) {
    search = RepoSearch;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .when('GET', 'https://api.github.com/users/hello/repos?access_token=' + gitAccessToken)
      .respond(
        { items: items }
      );
  }));

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  it('returns search results', function() {
    search.query('hello')
      .then(function(response) {
        expect(response.data.items).toEqual(items)
      })
    httpBackend.flush();
  });

});
