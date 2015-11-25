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

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

});
