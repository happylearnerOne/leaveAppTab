//angular.module('LeaveTaking.controllers', ['ionic','ionic-timepicker','ionic-datepicker','standardTimeMeridian'])
LeaveTaking
.controller('AddCtrl', function($scope, $rootScope, $q, $filter, $state, $ionicTabsDelegate, LeaveFactory, EmpFactory) { 
// .controller('AddCtrl', function($scope, $rootScope, $q, $filter, $state, $ionicTabsDelegate, $mdpDatePicker, $mdpTimePicker, LeaveFactory, EmpFactory) { 


// $scope.showDatePicker = function(ev) {
//       $mdpDatePicker($scope.currentDate, {
//         targetEvent: ev
//       }).then(function(selectedDate) {
//         $scope.currentDate = selectedDate;
//       });;
//     };
    
//     $scope.filterDate = function(date) {
//       return moment(date).date() % 2 == 0;
//     };
    
//     $scope.showTimePicker = function(ev) {
//       $mdpTimePicker($scope.currentTime, {
//         targetEvent: ev
//       }).then(function(selectedDate) {
//         $scope.currentTime = selectedDate;
//       });;
//     }  


  $scope.init = function(){
    console.log($rootScope.isLogin);    
    $rootScope.isShow = false;
    $rootScope.isHideTab = "";
    $q.all([getLeaveCodes(), getAllServingEmps(), getMyLeaveSignFlow(new Date())])
      .then(function(){
        $scope.totalday = 1;
        $scope.totalhour = 0;                      
        $rootScope.isShow = true;                                      
      });

    $scope.timeList = [
      {
        "id" : "1",
        "time" : "09:00"
      }, 
      {
        "id" : "2",
        "time" : "10:00"
      },
      {
        "id" : "3",
        "time" : "11:00"
      }
    ];
  }

  $scope.computeDateHour = function(){

  }
  $scope.createLeaveTaking = function(leave) {           
    /* filter date/time to specific format */
    var sdate = $filter( "date" )( $scope.datepickerObjectFrom.inputDate, 'yyyy-MM-dd' );
    var edate = $filter( "date" )( $scope.datepickerObjectTo.inputDate, 'yyyy-MM-dd' );
    var stime = epochParser($scope.timePickerObject24HourFrom.inputEpochTime, "time");
    var etime = epochParser($scope.timePickerObject24HourTo.inputEpochTime, "time");

    LeaveFactory.getNextLeaveId()
      .then(function(result){
        if(result.status == "200"){                            
          $scope.nextLeaveId = result.data.p_nextid;
          //return $q.resolve();
        }
        LeaveFactory.getNextFlowId()
          .then(function(result){
            if(result.status == "200"){                                    
              $scope.nextFlowId = result.data.p_nextid;
              $scope.maxFlowId = result.data.p_maxid;
              //return $q.resolve();
              /* make a new leave object */              
              $scope.newLeave = {
                ID: $scope.nextLeaveId, 
                EMP_NO: $rootScope.emp_no,                 
                LEAVEREASON_NO: "0",
                SDATE: sdate,
                SHOUR: stime, 
                EDATE: edate,
                EHOUR: etime,
                TOTAL_DAY: $scope.totalday,
                TOTAL_HOUR: $scope.totalhour,
                REASON: leave.reason,
                STATUS: "U",
                FLOW_ID: null,
                DEPUTY: $scope.leave.deputy,          
                MANAGERL1 : $scope.leave.managerL1,
                MANAGERL2 : (($scope.totalday*8) + $scope.totalhour <=8 ? null : $scope.leave.managerL2),
                HR: $scope.leave.hr,
                CRTCLERK: $rootScope.emp_no,
                MODCLERK: $rootScope.emp_no,
                NEXTFLOWID: $scope.nextFlowId,
                MAXFLOWID: $scope.maxFlowId
              };    
              LeaveFactory.saveNewLeave($scope.newLeave)
                .then(function(result){        
                  if(result.status == "200"){                                      
                    $scope.$emit('home:leaveAdd');
                    $ionicTabsDelegate.select(0); 
                  } else {
                    alert("存檔過程發生錯誤!");
                  }   
                }); 
            }

          });        
      });
  }; 

  /* initial:
   * datepicker/timepicker object */
  $scope.sysdate = new Date();  
  $scope.datepickerObjectFrom = {            
    titleLabel: 'Title',  //Optional
    todayLabel: 'Today',  //Optional
    closeLabel: 'Close',  //Optional
    setLabel: 'Set',  //Optional
    setButtonType : 'button-assertive',  //Optional
    todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    inputDate: $scope.sysdate,  //Optional
    mondayFirst: true,  //Optional
    //disabledDates: disabledDates, //Optional
    //weekDaysList: weekDaysList, //Optional
    //monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'false', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(2012, 8, 2), //Optional
    to: new Date(2018, 8, 25),  //Optional
    callback: function (val) {  //Mandatory
      datePickerCallbackFrom(val);
    },
    dateFormat: 'yyyy-MM-dd', //Optional
    closeOnSelect: true, //Optional
  };
  $scope.datepickerObjectTo = {
    titleLabel: 'Title2',  //Optional
    todayLabel: 'Today',  //Optional
    closeLabel: 'Close',  //Optional
    setLabel: 'Set',  //Optional
    setButtonType : 'button-assertive',  //Optional
    todayButtonType : 'button-assertive',  //Optional
    closeButtonType : 'button-assertive',  //Optional
    inputDate: $scope.sysdate,  //Optional
    mondayFirst: true,  //Optional
    //disabledDates: disabledDates, //Optional
    //weekDaysList: weekDaysList, //Optional
    //monthList: monthList, //Optional
    templateType: 'popup', //Optional
    showTodayButton: 'false', //Optional
    modalHeaderColor: 'bar-positive', //Optional
    modalFooterColor: 'bar-positive', //Optional
    from: new Date(2012, 8, 2), //Optional
    to: new Date(2018, 8, 25),  //Optional
    callback: function (val2) {  //Mandatory      
      datePickerCallbackTo(val2);
    },
    dateFormat: 'yyyy-MM-dd', //Optional
    closeOnSelect: true, //Optional
  };
  

  $scope.startTime = (9 * 60 * 60 );
  $scope.timePickerObject24HourFrom = {
    inputEpochTime: 9 * 60 * 60 ,  //Optional
    step: 30,  //Optional
    format: 24,  //Optional
    titleLabel: '24-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val3) {    //Mandatory
      timePicker24FromCallback(val3);
    }
  };
  $scope.timePickerObject24HourTo = {
    inputEpochTime: 18 * 60 * 60 ,  //Optional
    step: 30,  //Optional
    format: 24,  //Optional
    titleLabel: '24-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val3) {    //Mandatory
      timePicker24ToCallback(val3);
    }
  };

  /* datepicker, timepicker callback function */
  function datePickerCallbackFrom(val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {
      console.log('Selected From date is : ', val)
      $scope.datepickerObjectFrom.inputDate = val;
      $scope.datepickerObjectTo.inputDate = val;      
      getMyLeaveSignFlow(val);
      //getDateBetween($scope.datepickerObjectFrom.inputDate, $scope.datepickerObjectTo.inputDate);
      getDateHourBetween($scope.datepickerObjectFrom.inputDate, $scope.datepickerObjectTo.inputDate, $scope.timePickerObject24HourFrom.inputEpochTime, $scope.timePickerObject24HourTo.inputEpochTime);
    }
  };
  function datePickerCallbackTo(val) {
    if (typeof(val) === 'undefined') {
      console.log('No date selected');
    } else {     
      if(val < $scope.datepickerObjectFrom.inputDate){
        alert("請假日期(迄)不可早於請假日期(起)");
        return false;
      }
      $scope.datepickerObjectTo.inputDate = val;
      console.log('Selected to date is : ', val);
      
      //alert($scope.datepickerObjectTo.inputDate - $scope.datepickerObjectFrom.inputDate);
      //getDateBetween($scope.datepickerObjectFrom.inputDate, $scope.datepickerObjectTo.inputDate);
      getDateHourBetween($scope.datepickerObjectFrom.inputDate, $scope.datepickerObjectTo.inputDate, $scope.timePickerObject24HourFrom.inputEpochTime, $scope.timePickerObject24HourTo.inputEpochTime);
    }
  };  
  function timePicker24FromCallback(val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      if(val < 9*3600 || val > 18*3600){
        alert("上班時間起迄為 09:00~18:00");
        return false;
      }      
      $scope.timePickerObject24HourFrom.inputEpochTime = val;
      var selectedTime = new Date(val * 1000);
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      //getHourBetween(32400, val, "S");
      getDateHourBetween($scope.datepickerObjectFrom.inputDate, $scope.datepickerObjectTo.inputDate, $scope.timePickerObject24HourFrom.inputEpochTime, $scope.timePickerObject24HourTo.inputEpochTime);
    }
  }
  function timePicker24ToCallback(val) {
    if (typeof (val) === 'undefined') {
      console.log('Time not selected');
    } else {
      if(val < 9*3600 || val > 18*3600){
        alert("上班時間起迄為 09:00~18:00");
        return false;
      }      
      $scope.timePickerObject24HourTo.inputEpochTime = val;
      var selectedTime = new Date(val * 1000);
      console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      //getHourBetween(64800, val, "E");
      getDateHourBetween($scope.datepickerObjectFrom.inputDate, $scope.datepickerObjectTo.inputDate, $scope.timePickerObject24HourFrom.inputEpochTime, $scope.timePickerObject24HourTo.inputEpochTime);
    }
  }

  /* Local function */
  function prependZero(param) {
    if (String(param).length < 2) {
      return "0" + String(param);
    }
    return param;
  }

  function epochParser(val, opType) {
    if (val === null) {
      return "00:00";
    } else {
      if (opType === 'time') {
        var hours = parseInt(val / 3600);
        var minutes = (val / 60) % 60;

        return (prependZero(hours) + ":" + prependZero(minutes));
      }
    }
  } 

  function getLeaveCodes(){
    return LeaveFactory.getLeaveCodes()
              .then(function(result){
                if(result.status == "200"){
                  $scope.leaveCodes = result.data;
                }                
              });
  }
  function getAllServingEmps(){
    return EmpFactory.allServingEmps()
              .then(function(result){
                if(result.status == "200"){
                  $scope.servingEmpLists = result.data;
                } 
              });
  }
  function getMyLeaveSignFlow(theDate){
    var theYear = $filter('date')( theDate, 'yyyy' );  
    return LeaveFactory.getMyLeaveSignFlow(theYear, $rootScope.emp_no)
              .then(function(result){
                if(result.status == "200"){
                  $scope.mySignFlows = result.data;      
                  modifyMyLeaveSignFlowDefaultValue($scope.mySignFlows);        
                }
              });
  }

  function modifyMyLeaveSignFlowDefaultValue(mySignFlows){
    $scope.mySignFlowsL1 = $filter('filter')(mySignFlows, {FLOWLEVEL: 1}, true)[0];
    $scope.mySignFlowsL2 = $filter('filter')(mySignFlows, {FLOWLEVEL: 2}, true)[0];
    $scope.mySignFlowsL3 = $filter('filter')(mySignFlows, {FLOWLEVEL: 3}, true)[0];
    $scope.mySignFlowsL4 = $filter('filter')(mySignFlows, {FLOWLEVEL: 4}, true)[0];    

    if(typeof $scope.leave == 'undefined'){
      //alert("leave is undefined");
      $scope.leave = {   
        leaveType : (typeof $scope.leaveCodes == 'undefined' ? "" : $scope.leaveCodes[0].ASKFORLEAVEREASON_NO), 
        deputy : $scope.mySignFlowsL1.FLOW_EMPNO,
        managerL1 : $scope.mySignFlowsL2.FLOW_EMPNO, 
        managerL2 : $scope.mySignFlowsL3.FLOW_EMPNO,      
        hr : $scope.mySignFlowsL4.FLOW_EMPNO
      };
    } else {
      //alert("leave is not undefined");
      $scope.leave = {      
        deputy : $scope.mySignFlowsL1.FLOW_EMPNO,
        managerL1 : $scope.mySignFlowsL2.FLOW_EMPNO, 
        managerL2 : $scope.mySignFlowsL3.FLOW_EMPNO,      
        hr : $scope.mySignFlowsL4.FLOW_EMPNO
      };      
    }
     
  }  
  function getDateHourBetween(startdate, enddate, starttime, endtime, type){
    var _dtBetween = getDateBetween(startdate, enddate);
    var _hrBetween = getHourBetween(starttime, endtime);
    var _dateBetween = getDateBetween(startdate, enddate);
    var _hourBetweenS = getHourBetween(32400, starttime, "S");
    var _hourBetweenE = getHourBetween(64800, endtime, "E");  
    var _unCountHour = 0;  
    for(var i = 0; i < _dateBetween; i++){ 
      var _newDate = new Date($filter( "date" )( $scope.datepickerObjectFrom.inputDate, 'yyyy-MM-dd' ));   
      var theDay = $filter( "date" )( _newDate.setDate(_newDate.getDate() + i), 'yyyy-MM-dd' );
      var theWeekDay = (new Date(theDay)).getDay();
      if(theWeekDay == 0){
        _unCountHour = _unCountHour + 8;
      }
    }
    
    var _finalHour = _dateBetween * 8 - _hourBetweenS + _hourBetweenE - _unCountHour;
    var _modHour = _finalHour % 8;    
    if( _modHour == 0){
      $scope.totalhour = 0;
      $scope.totalday = _finalHour / 8;
    } else {
      $scope.totalhour = _modHour;
      $scope.totalday = (_finalHour - _modHour) / 8;
    }
  }  
  function getDateBetween(startdate, enddate){
    var _epochDt = (enddate - startdate)/1000;
    var _dateBetween = _epochDt / 3600 / 24;
    //alert("datebetween = " + _dateBetween);
    //$scope.totalday = _dateBetween + 1;
    return _dateBetween + 1;
  }  
  function getHourBetween(starttime, endtime, type){
    //alert("starttime = " + starttime);
    //alert("endtime = " + endtime);
    var realHourS = starttime / 3600;
    var realHourE = endtime / 3600;
    var _epochHr = (endtime - starttime) / 3600; 
   // alert("realHourS = " + realHourS);   
    //alert("realHourE = " + realHourE);
    if(type == "S"){
      if(realHourE <= 12){
        //alert("as = " + _epochHr);  

      } else {
        //alert("bs = " + (_epochHr - 1));        
        _epochHr = _epochHr - 1;
      }
    } else {
      if(realHourE <= 12){
        //alert("ae = " + (_epochHr - 1));
        _epochHr = _epochHr - 1;
      } else {
        //alert("be = " + _epochHr);
      }
    }
    return _epochHr;
  }  
});


