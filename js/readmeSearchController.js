readmeSearch.controller('ReadMeSearchController', ['$resource', function($resource) {

  var self = this;

  self.doSearch = function() {
    self.searchResult = $resource('https://api.github.com/users/' + self.searchTerm + '/repos').get();
  };

}]);
