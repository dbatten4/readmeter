readmeSearch.factory('ReadMeSearch', ['$http', function($http) {

  return {
    query: function(username, repo) {
      return $http({
        url: 'https://api.github.com/repos/' + username + '/' + repo + '/readme',
        method: 'GET',
        params: {
          'access_token': gitAccessToken
        }
      });
    }
  };

}]);
