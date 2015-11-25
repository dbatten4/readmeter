describe('factory: ReadMeSearch', function() {

  var search;

  var items = [
    {
      "size": 612,
      "html_url": "https://github.com/dbatten4/airport-js/blob/master/README.md",
      "message": null
    },
  ];

  beforeEach(module('ReadMeter'));

  beforeEach(inject(function(ReadMeSearch) {
    search = ReadMeSearch;
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .when('GET', 'https://api.github.com/repos/username/repo/readme?access_token=' + gitAccessToken)
      .respond(
        { items: items }
      );
  }));

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  it('returns search results', function() {
    search.query('username', 'repo')
      .then(function(response) {
        expect(response.data.items).toEqual(items);
      });
    httpBackend.flush();
  });

});
