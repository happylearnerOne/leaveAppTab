//angular.module('LeaveTaking.controllers', ['ionic','ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
LeaveTaking
.controller('ReportCtrl', function($scope,$rootScope, $location, $state, $stateParams, $ionicTabsDelegate, LeaveFactory) {

 	$scope.showMyLeaveRecords = function(){ 
 		$scope.reportStatus = "showMyLeaveRecords";
 		$scope.isLeaveRecord = true;
 		$scope.isSignRecord = false; 		
 		$scope.isWaitForSignRecord = false;
 		$scope.viewTitle = "我的請假紀錄"; 		
 		LeaveFactory.getMySendingLeaves($rootScope.emp_no, "Y")
			.then(function(result){
				if(result.status == "200"){
					$scope.mySendingLeaves = result.data;					
				}
			}); 		
 	}
 	$scope.showMySignRecords = function(){
 		$scope.reportStatus = "showMySignRecords";
 		$scope.isLeaveRecord = false;
 		$scope.isSignRecord = true;
 		$scope.isWaitForSignRecord = false;
 		$scope.viewTitle = "我的簽核紀錄";
 	}
 	$scope.showMyWaitForSignRecords = function(status){ 
 		$scope.reportStatus = "showMyWaitForSignRecords";
 		$scope.isLeaveRecord = false;
 		$scope.isSignRecord = false;
 		$scope.isWaitForSignRecord = true; 
 		$scope.isShowMySendingLeaveRecord = false;
 		// $scope.status = status;
 		$scope.viewTitle = "簽核中假單";
 		LeaveFactory.getMySendingLeaves($rootScope.emp_no, "U")
			.then(function(result){
				if(result.status == "200"){
					$scope.mySendingLeaves = result.data;					
				}
			});
 	}
 	$scope.showMySendingLeaveRecord = function(leave){ 		
		$scope.isLeaveRecord = false;
 		$scope.isSignRecord = false; 		
 		$scope.isWaitForSignRecord = false; 
 		$scope.isShowMySendingLeaveRecord = true;
 		$scope.viewTitle = "我的" + leave.ASKFORLEAVEREASON_NAME + "申請";
 		// $scope.viewTitle = leave.;
 		// if($scope.status == 'homeShowMySendingLeaves'){
 		// 	$scope.status = 'homeShowMySendingLeaveRecord';
 		// } else {
 		// 	$scope.status = 'showMySendingLeaveRecord';	
 		// }
 		
 		$scope.mySendingLeaveRec = leave;
 	}

 	$scope.goBack = function(status) {  	 
 		console.log("!==== status =====!");
 		console.log(status); 	
 		//alert(status);
 		if(status == "showMyWaitForSignRecords"){
 			$scope.showMyWaitForSignRecords();
 		} else if(status == "showMyLeaveRecords"){
 			$scope.showMyLeaveRecords();
 		} else if(status == "reportList"){
 			$scope.init();
 		}
  	// if(status == 'showMySendingLeaveRecord'){
  	// 	$scope.showMyWaitForSignRecords('showMyWaitForSignRecords');
  	// } else if(status == 'showMyWaitForSignRecords'){
  	// 	$scope.init();  	
  	// } else if(status == 'homeShowMySendingLeaves'){
   //  	$scope.$emit('home:leaveAdd');
   //  	$ionicTabsDelegate.select(0); 
  	// } else if(status == 'homeShowMySendingLeaveRecord'){
  	// 	$scope.showMyWaitForSignRecords('homeShowMySendingLeaves');
  	// }
  }
  
	$scope.init = function(){
		$scope.isLeaveRecord = false;
		$scope.isSignRecord = false;
		$scope.isWaitForSignRecord = false;
		$scope.isShowMySendingLeaveRecord = false;
		$scope.status  = null;				
	}

	$scope.onTabDeselected = function(){  		
		$scope.init();
	}

	$scope.onTabSelected = function(){  		
		//$scope.init();
		if(typeof $stateParams.param == "undefined"){
			console.log("param is undefined");
			$scope.init();
			$scope.status = null;
			$scope.viewTitle = "Report";
		} else if($stateParams.param == "wfsr"){
			//wfsr = wait for sign records			
			//$scope.showMyWaitForSignRecords('homeShowMySendingLeaves');						
			$scope.showMyWaitForSignRecords(null);	
			$scope.viewTitle = "送簽中假單";					
		} else if($stateParams.param == 'test'){
			console.log('testing');
		}
	}

});


