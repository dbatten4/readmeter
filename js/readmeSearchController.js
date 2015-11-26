readmeSearch.controller('ReadMeSearchController', ['RepoSearch', 'ReadMeSearch', function(RepoSearch, ReadMeSearch) {

  var self = this;
  self.gitRepoNames = [];
  self.readMes = [];
  self.noReadMes = [];

  self.doSearch = function() {
    RepoSearch.query(self.username)
      .then(function(response) {
        self.searchResult = response.data;
        for(var i = 0; i < self.searchResult.length; i++) {
          var name = self.searchResult[i]['name']
          self.gitRepoNames.push(name);
        };
        for(var i = 0; i< self.gitRepoNames.length; i++) {
          (function(i) {
            ReadMeSearch.query(self.username, self.gitRepoNames[i])
              .then(function(response) {
                self.readMes.push(
                  {
                    name: self.gitRepoNames[i],
                    size: response.data["size"],
                    url: response.data["html_url"]
                  }
                );
              }).catch(function(e){
                self.noReadMes.push(
                  {
                    name: self.gitRepoNames[i],
                  }
                );
              });
          })(i);
        };
      });
  };

  function arr_diff (a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      } else {
        a[a2[i]] = true;
      }
    }
    for (var k in a) {
      diff.push(k);
    }
    return diff;
  };

}]);
