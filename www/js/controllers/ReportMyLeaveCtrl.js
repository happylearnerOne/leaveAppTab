LeaveTaking
.controller('ReportMyLeaveCtrl', function($scope, $rootScope, $state, $stateParams, $ionicTabsDelegate, LeaveFactory) {

	console.log("in ReportMyLeaveCtrl");

	
	$scope.onTabDeselected = function(){  		
		//$scope.init();
	}
	$scope.onTabSelected = function(){  		
		//$scope.init();
		console.log(123);
		if(typeof $stateParams.param == "undefined"){
			console.log("ReportMyLeaeCtrl param is undefined");
			//$scope.init();
			$scope.status = null;
			$scope.viewTitle = "Report";
		} else if($stateParams.param == "wfsr"){
			//wfsr = wait for sign records			
			//$scope.showMyWaitForSignRecords('homeShowMySendingLeaves');						
			//$scope.showMyWaitForSignRecords(null);	
			$scope.viewTitle = "送簽中假單";					
		}
	} 	
});