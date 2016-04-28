LeaveTaking
    .factory('LeaveFactory', LeaveFactory);

LeaveFactory.$inject = ['$http', '$q'];

function LeaveFactory($http, $q){
  return {
    getId : getId,
    saveId : saveId,
    all : all,
    save : save,
    myUnsignLeaves : myUnsignLeaves,
    getMySendingLeaves : getMySendingLeaves,
    getNeedMeSignLeaves : getNeedMeSignLeaves,
    saveNewLeave : saveNewLeave,
    getNextLeaveId : getNextLeaveId,
    getNextFlowId : getNextFlowId,
    getLeaveCodes : getLeaveCodes,
    getMyLeaveSignFlow : getMyLeaveSignFlow
  }

  function getId(){      
    var idString = window.localStorage['id']; 
    if(idString != null) { 
      return angular.fromJson(idString); 
    } 
    return {id: 3}; 
  }
  function saveId(id){
     window.localStorage['id'] = angular.toJson(id); 
  }
  function all() {       
    var leaveString = window.localStorage['leaves'];       
    if(leaveString != null) {        
      return angular.fromJson(leaveString); 
    } 
    return [];
  }
  function save(leaves) { 
    window.localStorage['leaves'] = angular.toJson(leaves);
    var leaveString = window.localStorage['leaves']; 
  }
  function myUnsignLeaves(emp_no){
    var leaveString = window.localStorage['leaves'];
          
    if(leaveString != null) {                
      var rtObjs = [];
      var objs =  angular.fromJson(leaveString);    
      angular.forEach(objs, function(obj, index) {      
        if(typeof obj.signflow != 'undefined'){
          var flow = $filter('filter')(obj.signflow,{status:"U", emp_no:emp_no}, true);             
          if(flow.length > 0){
            rtObjs.push(obj);
          }
        }
      });  

      return rtObjs; 
    } 
    
    return [];      
  }  
  function getMySendingLeaves(emp_no, leaveType){
    console.log("in getMySendingLeaves, emp_no = " + emp_no);
    console.log("in getMySendingLeaves, leaveType = " + leaveType);
    return $http.get(urlConfig.apiurl + "api/getMyLeaveListByType/" + emp_no + "/" + leaveType)
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("failed");
            console.log(error);    
      return $q.reject();
    }                   
  }
  function getNeedMeSignLeaves(emp_no){
    return $http.get(urlConfig.apiurl + "api/getNeedMeSignLeaveList/" + emp_no)
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("failed");
            console.log(error);    
      return $q.reject();   
    }             
  }
  function saveNewLeave(leave){
    console.log("in saveNewLeave, leave=" + leave);
    return $http.post(urlConfig.apiurl + "api/saveNewLeave", leave)
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("save success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("save failed");
            console.log(error);  
      return $q.reject();         
    }             
  }
  function getNextLeaveId(){
    return $http.get(urlConfig.apiurl + "api/getNextLeaveId")
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("getNextLeaveId success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("getNextLeaveId failed");
            console.log(error);
      return $q.reject();       
    }             
  }
  function getNextFlowId(){
    return $http.get(urlConfig.apiurl + "api/getNextFlowId")
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("getNextFlowId success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("getNextFlowId failed");
            console.log(error);
      return $q.reject();       
    }             
  }
  function getLeaveCodes(){
    return $http.get(urlConfig.apiurl + "api/getLeaveCodes")
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("getLeaveCodes success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("getLeaveCodes failed");
            console.log(error); 
            alert("get code error");   
      return $q.reject();  
    }        
  }
  function getMyLeaveSignFlow(year, emp_no){
    return $http.get(urlConfig.apiurl + "api/getMyLeaveSignFlow/" + year + "/" + emp_no)
            .then(httpMethodSuccess)
            .catch(httpMethodFailed);
    function httpMethodSuccess(results) {
            console.log("getMyLeaveSignFlow success");
            console.log(results);
      return results;
    }
    function httpMethodFailed(error) {
            console.log("getMyLeaveSignFlow failed");
            console.log(error);  
      return $q.reject();     
    }     
  }
}


/*

LeaveTaking
.factory('LeaveFactory', function($filter) { 
  return { 
    getId: function(){      
      var idString = window.localStorage['id']; 
      if(idString != null) { 
        return angular.fromJson(idString); 
      } 
      return {id: 3}; 
    },
    saveId: function(id){
      window.localStorage['id'] = angular.toJson(id); 
    },
    all: function() {       
      var leaveString = window.localStorage['leaves'];       
      if(leaveString != null) {        
        return angular.fromJson(leaveString); 
      } 
      return [];
    },     
    save: function(leaves) { 
      window.localStorage['leaves'] = angular.toJson(leaves);
       var leaveString = window.localStorage['leaves']; 
    }
    , 
    myUnsignLeaves: function(emp_no){
      var leaveString = window.localStorage['leaves'];
            
      if(leaveString != null) {                
        var rtObjs = [];
        var objs =  angular.fromJson(leaveString);    
        angular.forEach(objs, function(obj, index) {      
          if(typeof obj.signflow != 'undefined'){
            var flow = $filter('filter')(obj.signflow,{status:"U", emp_no:emp_no}, true);             
            if(flow.length > 0){
              rtObjs.push(obj);
            }
          }
        });  

        return rtObjs; 
      } 
      
      return [];      
    }
  }
});
*/