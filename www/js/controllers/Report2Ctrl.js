//angular.module('LeaveTaking.controllers', ['ionic','ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
LeaveTaking
.controller('Report2Ctrl', function($scope,$stateParams) {

  console.log("p1 is");
  console.log($stateParams);  

 	$scope.showMyLeaveRecords = function(){
 		$scope.isLeaveRecord = true;
 		$scope.isSignRecord = false; 		
 	}
 	$scope.showMySignRecords = function(){
 		$scope.isLeaveRecord = false;
 		$scope.isSignRecord = true;
 	}
 	$scope.goBack = function() {
   	$scope.init();
  }
  
	$scope.init = function(){
	$scope.isLeaveRecord = false;
	$scope.isSignRecord = false;
	console.log("isLeaveRecord = " + $scope.isLeaveRecord);	
	}

	$scope.onTabDeselected = function(){  
	$scope.init();
	}

	$scope.onTabSelected = function(){  		
		$scope.init();
	}

});


