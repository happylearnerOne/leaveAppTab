//angular.module('LeaveTaking.controllers', ['ionic','ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
LeaveTaking
.controller('SignCtrl', function($scope, $rootScope, $ionicTabsDelegate, $stateParams, LeaveFactory) {

  //console.log("in SignCtrl");
  $scope.leaves = [];  

  $scope.doAgree = function(leave){
    alert("同意此張假單");
    
    angular.forEach($scope.allLeaves, function(obj, index) {      
      if(obj.id == leave.id){
        obj.status = "Y";
      }
    });   

    console.log("agree");
    console.log($scope.allLeaves);
    LeaveFactory.save($scope.allLeaves);
    $scope.init();
    $scope.$emit('home:leaveAdd');        
  }
  $scope.doDisagree = function(leave){
    alert("不同意此張假單");
    $scope.init();
  }
  $scope.showLeaveRecord = function(leave){    
    $scope.isShowLeaveRecord = true;
    $scope.showLeave = leave;
  }
  $scope.init = function(){
    $rootScope.isHideTab = "";
    $scope.isShowLeaveRecord = false;
    $scope.allLeaves = LeaveFactory.all();
    $scope.leaves = LeaveFactory.myUnsignLeaves($rootScope.emp_no);
  }
  $scope.goBack = function(){
    $scope.$emit('home:leaveAdd');
    $ionicTabsDelegate.select(0); 
  }
  $scope.onTabDeselected = function(){
    //$scope.init();
  }
  $scope.onTabSelected = function(){
    //$scope.init();
    console.log("aa=" + $stateParams.param);
    if(typeof $stateParams.param == "undefined"){
      console.log("param is undefined");
      $scope.init();
      $scope.status = null;
      $scope.viewTitle = "Sign";
    } else if($stateParams.param == "wfmtsr"){
      //wtmtsr = wait for me to sign records      
      console.log($stateParams.param);
      //$scope.status = "fromHome";
      $scope.status = null;
      $scope.viewTitle = "待簽核的假單";
    }    
  }
});
