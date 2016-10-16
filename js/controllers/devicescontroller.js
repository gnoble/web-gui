zwaveapp.controller('devicescontroller', function($scope, $interval, Zway, Devices, Mqtt) {
  var devices=[];
  $scope.devices = [];
  $scope.devices_db = null;
  $scope.loading = true;
  $scope.sortableOptions = {
    stop: function(e, ui) {
      for (var i = 0; i < $scope.devices.length; i++) {
        $scope.devices[i].priority = i; /*set new order*/
      }
      $scope.update($scope.devices);
    }
  }

  function cb(err) {
    init_commandclases();
  }
  $scope.reload = function() {
    init_commandclases();
  }
  $scope.add = function(device) {
    if (!device || !device.id)
      return;
    Devices.update(device, cb);
  }
  $scope.update = function(devices) {
    Mqtt.save($scope.devices);
    for (var i = 0; i < devices.length; i++) {
      if (!devices[i] || !devices[i].id)
        return;

      if (i == devices.length - 1)
        Devices.update(devices[i], cb);
      else
        Devices.update(devices[i]);
    }
  }
  $scope.update_zway = function(devices) {
    for (var i = 0; i < devices.length; i++) {
      if (!devices[i] || !devices[i].id)
        return;
      if (i == devices.length - 1)
        Zway.set(devices[i], cb);
      else
        Zway.set(devices[i]);
    }
  }

  function init_commandclases() {
    Devices.query(function(devices) {
      $scope.devices_db=devices;
      $scope.loading = false;
      devices.sort(function(dev_a, dev_b) {
        return (dev_a.priority - dev_b.priority);
      });

      Zway.GetDevices( function(devices) {
        init(devices);
      });
    });
  }

  function init(devices) {
    if (!devices)
      return;
    /*remove devices that are NOT on the database*/
    $scope.devices=[];
    for (var i=0;i<$scope.devices_db.length;i++){
      for (var j=0;j<devices.length;j++){
        if ($scope.devices_db[i].zwave_id==devices[j].zwave_id){
          devices[j].name=$scope.devices_db[i].name; /*User the name on the database*/
          $scope.devices.push(devices[j]);
        }
      }
    }
    $scope.devices.forEach(function(device, i, devices) {
      Zway.get(devices[i], function(device) {
        if (i == devices.length - 1)
          $scope.loading = false;
      });
    });
  }
  init_commandclases();
  $interval(init_commandclases, 5000);
});
