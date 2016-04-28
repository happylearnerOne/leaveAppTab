//LeaveTakingServices
LeaveTaking
    .factory('AccountFactory', AccountFactory);

AccountFactory.$inject = ['$http','$q'];

function AccountFactory($http, $q){
  return {
    login: login
  }  
  function login(data){
    console.log(urlConfig.apiurl);
    console.log(data);

    return $http.post(urlConfig.apiurl + "api/menuAccount/", data)
          .then(httpMethodSuccess)
          .catch(httpMethodFailed);

    function httpMethodSuccess(results) {
            console.log("login, success");
            console.log(results);
      return results;
    }

    function httpMethodFailed(error) {
      console.log("login, failed");
      console.log(error);  
      //return error;    
      return $q.reject();
    }       
  }
}


