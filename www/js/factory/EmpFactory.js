//LeaveTakingServices
LeaveTaking
    .factory('EmpFactory', EmpFactory);

EmpFactory.$inject = ['$http', '$q'];

function EmpFactory($http, $q){
  return {
    allServingEmps: allServingEmps
  }  
  function allServingEmps(data){
    console.log(urlConfig.apiurl);
    console.log(data);

    return $http.get(urlConfig.apiurl + "api/allServingEmps/")
          .then(httpMethodSuccess)
          .catch(httpMethodFailed);

    function httpMethodSuccess(results) {
            console.log("allServingEmps, success");
            console.log(results);
      return results;
    }

    function httpMethodFailed(error) {
            console.log("allServingEmps, failed");
            console.log(error);  
      return $q.reject();     
    }       
  }
}


