readmeSearch.controller('ReadMeSearchController', ['RepoSearch', 'ReadMeSearch', function(RepoSearch, ReadMeSearch) {

  var self = this;
  self.gitRepoNames = [];
  self.readMes = [];
  self.noReadMes = [];

  self.doSearch = function() {
    RepoSearch.query(self.username)
      .then(function(response) {
        addRepoNames(response);
        for(var i = 0; i< self.gitRepoNames.length; i++) {
          (function(i) {
            ReadMeSearch.query(self.username, self.gitRepoNames[i])
              .then(function(response) {
                addToReposWithReadMes(response, i);
              }).catch(function(e){
                addToReposWithoutReadMes(response, i);
              });
          })(i);
        };
      });
  };

  addRepoNames = function(response) {
    self.searchResult = response.data;
    for(var i = 0; i < self.searchResult.length; i++) {
      var name = self.searchResult[i]['name']
      self.gitRepoNames.push(name);
    };
  };

  addToReposWithReadMes = function(response, i) {
    self.readMes.push(
      {
        name: self.gitRepoNames[i],
        size: response.data["size"],
        url: response.data["html_url"]
      }
    );
  };

  addToReposWithoutReadMes = function(response, i) {
    self.noReadMes.push(
      {
        name: self.gitRepoNames[i]
      }
    );
  };

}]);
