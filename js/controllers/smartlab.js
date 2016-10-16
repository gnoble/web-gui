zwaveapp.controller('smarlabcontroller', function ($scope,$window,$timeout) {
  $scope.redirect=function(){
    $timeout(function(){
      $window.location.href="http://hvaler.larry.no:8083";
    },1000);
  }
});
