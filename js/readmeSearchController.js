readmeSearch.controller('ReadMeSearchController', ['RepoSearch', 'ReadMeSearch', '$q', function(RepoSearch, ReadMeSearch, $q) {

  var self = this;
  self.gitRepoNames = [];
  self.readMes = [];
  self.noReadMes = [];
  self.inUse = false;
  self.largestReadMe = [];

  self.doSearch = function() {
    var namesPromise =
      RepoSearch.query(self.username)
        .then(function(repoResponse) {
          addRepoNames(repoResponse);
          return self.lookupNamesPromises(repoResponse);
        }).catch(function(error) {
          console.log('error: ' + error);
        });
      namesPromise.then(function(promises) {
        $q.all(promises).finally(function() {
          percentageOfReposWithReadMes();
          self.inUse = true;
        });
      });
    return namesPromise;
  };

  self.lookupNamesPromises = function(repoResponse) {
    var namesPromise = [];
    for(var i = 0; i < self.gitRepoNames.length; i++) {
      (function(i) {
        var p = (ReadMeSearch.query(self.username, self.gitRepoNames[i])
                .then(function(readmeResponse) {
                  addToReposWithReadMes(readmeResponse, i);
                  return readmeResponse;
                }).catch(function(e) {
                  addToReposWithoutReadMes(e, i);
                  return e;
                })
        );
        namesPromise.push(p);
      })(i);
    }
    return namesPromise;
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
        size: parseInt(response.data["size"]),
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

  percentageOfReposWithReadMes = function() {
    var percentage;
    percentage = (self.noReadMes.length / self.gitRepoNames.length) * 100
    self.readMePercentage = percentage.toFixed(1);
  };

  largestReadMe = function() {
    var array = self.readMes;
    var res = Math.max.apply(Math,array.map(function(o){return o.size;}));
    var found = array.reduce(function(a, b) {
      return (a.res == res && a) || (b.res == res && b)
    });
    self.largestReadMe = [(
      {
        name: found,
        size: res
      }
    )];
  };

}]);
