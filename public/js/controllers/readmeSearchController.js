readmeSearch.controller('ReadMeSearchController', ['RepoSearch', 'ReadMeSearch', '$q', '$document', '$timeout', function(RepoSearch, ReadMeSearch, $q, $document, $timeout) {

  var self = this;
  self.gitRepoNames = [];
  self.readMes = [];
  self.noReadMes = [];
  self.inUse = false;
  self.largestReadMe = [];
  self.smallestReadMe = [];

  self.doSearch = function() {
    var namesPromise =
      RepoSearch.query(self.username)
        .then(function(repoResponse) {
          addRepoNames(repoResponse);
          return self.lookupNamesPromises();
        }).catch(function(error) {
          console.log('error: ' + error);
        });
      namesPromise.then(function(promises) {
        $q.all(promises).finally(function() {
          readMeCalculations();
          percentageOfReposStateCalculation();
          self.startFadeOut = true;
          $timeout(function() {
            self.inUse = true;
            self.startFadeIn = true;
          }, 1000);
        });
      });
    return namesPromise;
  };

  self.lookupNamesPromises = function() {
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

  self.reloadPage = function() {
    $timeout(function() {
      self.gitRepoNames = [];
      self.readMes = [];
      self.noReadMes = [];
      self.largestReadMe = [];
      self.smallestReadMe = [];
      self.username = "";
      self.inUse = false;
    }, 1000);
    var titleElement = angular.element(document.getElementById('primary'));
    $document.scrollToElement(titleElement, 100, 1000);
  };

  addRepoNames = function(response) {
    self.repoSearchResult = response.data;
    for(var i = 0; i < self.repoSearchResult.length; i++) {
      var name = self.repoSearchResult[i]['name']
      self.gitRepoNames.push(name);
    };
  };

  addToReposWithReadMes = function(response, i) {
    self.readmeSearchResult = response.data;
    self.readMes.push(
      {
        name: self.gitRepoNames[i],
        size: parseInt(self.readmeSearchResult["size"]),
        url: self.readmeSearchResult["html_url"]
      }
    );
  };

  addToReposWithoutReadMes = function(response, i) {
    self.noReadMes.push(
      {
        name: self.gitRepoNames[i]
      }
    )
  };

  readMeCalculations = function() {
    percentageOfReposWithReadMes();
    largestReadMe();
    smallestReadMe();
    averageSizeOfReadMes();
  };

  percentageOfReposWithReadMes = function() {
    var percentage;
    percentage = (self.noReadMes.length / self.gitRepoNames.length) * 100
    self.readMePercentage = percentage.toFixed(1);
  };

  largestReadMe = function() {
    var maxRepo = _.max(self.readMes, function(obj) {
      return obj.size;
    });
    self.largestReadMe = (
      {
        name: maxRepo.name,
        size: maxRepo.size
      }
    );
  };

  smallestReadMe = function() {
    var minRepo = _.min(self.readMes, function(obj) {
      return obj.size;
    });
    self.smallestReadMe = (
      {
        name: minRepo.name,
        size: minRepo.size
      }
    );
  };

  averageSizeOfReadMes = function() {
    var totalNumberOfReadMes = self.readMes.length;
    var average = 0;
    for(var i = 0; i < totalNumberOfReadMes; i++) {
      average += self.readMes[i].size / totalNumberOfReadMes;
    };
    self.averageReadMeSize = parseInt(average);
  };

  percentageOfReposStateCalculation = function() {
    var num = self.readMePercentage;
    if(num <= 10) {
      self.percentageOfReposState = 'good_value';
    } else if(num <= 20) {
      self.percentageOfReposState = 'ok_value';
    } else {
      self.percentageOfReposState = 'bad_value';
    };
    return self.percentageOfReposState;
  };


}]);
