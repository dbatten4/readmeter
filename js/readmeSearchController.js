readmeSearch.controller('ReadMeSearchController', [function() {

  var self = this;

  self.doSearch = function() {
    self.searchResult = {
      items: [
        {
          "name": "Octocat"
        },
        {
          "name": "Boris-Bikes"
        }
      ]
    };
  };

}]);
