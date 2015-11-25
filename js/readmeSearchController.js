readmeSearch.controller('ReadMeSearchController', ['Search', function(Search) {

  var self = this;
  self.gitRepoNames = [];

  self.doSearch = function() {
    Search.query(self.searchTerm)
      .then(function(response) {
        self.searchResult = response.data;
        for(var i = 0; i < self.searchResult.length; i++) {
          var name = self.searchResult[i]['name']
          self.gitRepoNames.push({'name': name});
        };
      });
  };

}]);
