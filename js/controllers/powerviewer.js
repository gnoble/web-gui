zwaveapp.controller('powerviewer', function ($scope, $http, $interval,KWh) {
  /* Highcharts settings */
  $scope.lastHourGraph = JSON.parse(JSON.stringify(chartConfig));
  $scope.powerGauge = JSON.parse(JSON.stringify(gaugeConfig));

  $scope.powerGauge.series[0].dataLabels.formatter = function () {
    return this.y + ' KW<br/> ' + Highcharts.dateFormat('%H:%M', this.series.userOptions.date);
  };

  /* Controller variables */
  $scope.data = {
      powerList: $scope.lastHourGraph.series[0].data,
      loaded: false // set to `true` when graphs are ready to be shown.
  };

  var getLastPower = function() {
    if ($scope.data.powerList) {
      return $scope.data.powerList[ $scope.data.powerList.length - 1 ];
    }
  };

  var parseSample = function(sample) {
    var offset = (new Date()).getTimezoneOffset();
    var timestamp = Date.parse(sample.Date) - (offset * 60 * 1000);
    var kw = Math.round(parseFloat(sample.instantPower)) / 1000;
    return [timestamp, kw];
  };

  var setMaxPower = function(response) {
      var currentPower = $scope.powerGauge.series[0].data || 0;
      var maxPower = response.data.length > 0 ? response.data[0].kwh : 2.0;
      var thirdMaxPower = response.data.length > 2 ? response.data[2].kwh : maxPower;

      $scope.powerGauge.yAxis.currentMax = Math.max(maxPower, currentPower) * 1.2;

      $scope.powerGauge.yAxis.plotBands[0].to = thirdMaxPower;
      $scope.powerGauge.yAxis.plotBands[1].from = thirdMaxPower;
      $scope.powerGauge.yAxis.plotBands[1].to = maxPower;
      $scope.powerGauge.yAxis.plotBands[2].from = maxPower;

      $scope.lastHourGraph.yAxis.plotLines[0].value = maxPower;
      $scope.lastHourGraph.yAxis.minRange = maxPower * 1.1;

      $scope.powerGauge.loading = false;
      $scope.lastHourGraph.loading = false;
      $scope.data.loaded = true;
  };

  var addSamples = function(response) {

    if ( !response || !response.data || !response.data.length)
      return null;

    var samples = [];

    $.each(response.data, function(i, sample) {
      var lastPower = getLastPower();
      if (lastPower && sample[0] <= lastPower[0]) {
        return;
      }
      samples.push([sample.Date,sample.kw]);
    });

    samples.sort();

    $.each(samples, function(i, sample) {
      $scope.data.powerList.push(sample);
    });

    /* Make sure we only show 60 data points at a2 time */
    while ($scope.data.powerList.length > 60) {
      $scope.data.powerList.splice(0, 1);
    }

    /* Update gauge. */
    var lastPower = getLastPower();
    $scope.powerGauge.series[0].date = lastPower[0];
    $scope.powerGauge.series[0].data = [lastPower[1]];
  };

  var update = function(num_samples) {
    num_samples = num_samples ? num_samples : 1;
    KWh.getLast(num_samples,addSamples);
    $http.get(materialConfig.month_url).then(setMaxPower);
  };

  update(60);
  $interval(function() {
      update(1);
  }, 10 * 1000);
});
