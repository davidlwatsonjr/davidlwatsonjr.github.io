angular.module('last.fmDupRemoverApp').factory('lastFM', ['$http', function ($http) {
  var baseURL = 'https://last-fm-api-endpoint-voexvag3xa-uc.a.run.app/index.php/';

  return {
    getSession: function () {
      return $http.get(baseURL + 'auth/session');
    },
    get: function (method, params) {
      return $http.get(baseURL + method, { params: params });
    },
    post: function (method, params) {
      return $http.post(baseURL + method, params);
    }
  };
}]);
