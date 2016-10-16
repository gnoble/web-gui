zwaveapp.controller('powerhistory', function($scope, $http, $interval, KWh, KW) {
  /* Highcharts settings */
  $scope.powerStory = JSON.parse(JSON.stringify(powerStory));
  /* Controller variables */
  $scope.data = {
    loaded: false // set to `true` when graphs are ready to be shown.
  };

  var end=new Date();
  var begin=new Date();
  begin.setDate(end.getDate()-1);

  $scope.date = {
    begin: begin,
    end: end,
    format: 'D MMM YYYY HH:mm:ss',
    maxView:'year',
    minView:'hours',
    maxDate: moment(),
    view: 'date',
    granularity:['month','date','hours','minutes']
  };

  var toHighCharts = function(data) {
    var series = [];
    for (var i = 0; i < data.length; i++) {
      series.push(
        [data[i].Date, data[i].Kw]
      );
    }
    return series.sort();
  }
  var addData = function(response) {
    $scope.powerStory.series.pop();
    $scope.powerStory.series.push({
      name: 'Power consumition ratio',
      drilldown: true,
      id: 'kw',
      data: toHighCharts(response.data),
      events: {
        click: function(e) {
          var index = $scope.date.granularity.indexOf($scope.date.minView);
          index++;
          if (!$scope.date.granularity[index])
            return;
          $scope.date.minView=$scope.date.granularity[index];
          KW.Get($scope.date.minView,e.timeStamp,addData);
        }
      }
    });
    $scope.data.loaded = true;
  };
  $scope.update = function() {
    console.log('update');
    KW.Get($scope.date.minView,$scope.date.begin,$scope.date.end,addData);
  };
  $scope.zoomout = function(){
    var index = $scope.date.granularity.indexOf($scope.date.minView);
    index--;
    if (!$scope.date.granularity[index])
      return;
    $scope.date.minView=$scope.date.granularity[index];
    $scope.update();
  }
  $scope.update();
});
