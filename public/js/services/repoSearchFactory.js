readmeSearch.factory('RepoSearch', ['$http', function($http) {

  return {
    query: function(searchTerm) {
      return $http({
        url: 'https://api.github.com/users/' + searchTerm + '/repos',
        method: 'GET',
        params: {
          'access_token': process.env.GIT_ACCESS_TOKEN || gitAccessToken
        }
      });
    }
  };

}]);
