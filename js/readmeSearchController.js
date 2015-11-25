readmeSearch.controller('ReadMeSearchController', ['RepoSearch', 'ReadMeSearch', function(RepoSearch, ReadMeSearch) {

  var self = this;
  self.gitRepoNames = [];

  self.doSearch = function() {
    RepoSearch.query(self.username)
      .then(function(response) {
        self.searchResult = response.data;
        for(var i = 0; i < self.searchResult.length; i++) {
          var name = self.searchResult[i]['name']
          self.gitRepoNames.push({'name': name});
        };
      });
  };

}]);
