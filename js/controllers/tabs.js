zwaveapp.controller('tabs', function ($scope,$location) {
  $scope.location = $location;
  $scope.path=$location.path();
});
