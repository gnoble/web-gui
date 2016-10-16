zwaveapp.controller('mqtt', function ($scope,Mqtt) {
  $scope.devices=null;
  Mqtt.get(function(mqtt){
    $scope.devices=mqtt;
  });
});
