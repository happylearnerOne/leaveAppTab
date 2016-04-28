//angular.module('LeaveTaking.controllers', ['ionic','ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
LeaveTaking
.controller('HomeCtrl', function($scope, $rootScope, $filter, $state, LeaveFactory, AccountFactory) {
  $rootScope.isLogin = false; 
  if($rootScope.isLogin){
    console.log("isLogin");
    $rootScope.isHideTab = "tabs-item-hide";  
  } else {
    console.log("isNotLogin");
    $rootScope.isHideTab = "";    
  }
    
  $rootScope.needMeSignLeaves = [];
  $scope.mySendingLeaves = [];
  $scope.leaves = [];   
  $scope.loginData = {
      "userid" : "0147",
      "password" : "1234"
  };

	//LeaveFactory.save($scope.leaves); 
 
  /* scope function */
  $scope.login = function(loginData){    
  	    
   	AccountFactory.login(loginData)
   		.then(function(result){
   			if(result.status == '200'){
   				$rootScope.emp_no = loginData.userid;
   				$rootScope.isLogin = true;
          $rootScope.isHideTab = "tabs-item-hide";             
    			$scope.updateList();    				
   			} else {
   				alert("login failed");
   			}  			
   		})
   		.catch(function(err){
   			$rootScope.isLogin = false; 
        $rootScope.isHideTab = "";  
   			alert("login err:" + err);
   		});
  }
	$scope.updateList = function() {
		LeaveFactory.getMySendingLeaves($rootScope.emp_no, "U")
			.then(function(result){
				if(result.status == '200'){
					$scope.mySendingLeaves = result.data;
				} 
				LeaveFactory.getNeedMeSignLeaves($rootScope.emp_no)
					.then(function(result){
						if(result.status == '200'){
							$rootScope.needMeSignLeaves = result.data;
						}
					});
			});
  }  
  $scope.goGetUnsign = function(){
  	$state.go('tab.report.unsign', {param: "wfsr"});
  }
  $scope.goGetNeedMeSign = function(){
    $state.go('tab.sign.unsign', {param: "wfmtsr"});
  }
  $scope.goAddNewLeave = function(){
    $state.go('tab.add', {param: "addNewLeave"});
  }

  $scope.onTabDeselected = function(){
  	console.log("homeCtrl onTabDeselected");
    $rootScope.isHideTab = "";  
  }
  $scope.onTabSelected = function(){
  	console.log("homeCtrl onTabSelected");
    $rootScope.isHideTab = "tabs-item-hide";  
  }

  /* Listener */
  $rootScope.$on('home:leaveAdd', function() {
  	$scope.updateList();
	});

	/* Local Function */
	//取得我還沒簽核的假單
	function getUnsignLeaves(leaves){
    angular.forEach(leaves, function(obj, index) {  		
  		if(typeof obj.signflow != 'undefined'){
	  		var flow = $filter('filter')(obj.signflow,{status:"U", emp_no:"0147"}, true);	           	
	  		if(flow.length > 0){
	  			$scope.mySendingLeaves.push(obj);
	  		}
  		}
		}); 		
	}	
	//取得我送簽中的假單
	function getMyUnsignLeave(leaves){
    angular.forEach(leaves, function(obj, index) {
  		if(obj.status == "U" && obj.emp_no == "0133"){
  			$scope.mySendingLeaves.push(obj);
  		}
		}); 
	}


});

