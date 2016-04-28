//angular.module('LeaveTaking.controllers', ['ionic','ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
LeaveTaking
.controller('TabCtrl', function($scope, $rootScope) {
  $scope.init = function(){
		$rootScope.isLeaveRecord = false;
		$rootScope.isSignRecord =false;	  
		console.log("TabCtrl: isLeaveRecord = " + $scope.isLeaveRecord);	
  }

});


