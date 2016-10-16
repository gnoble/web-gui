zwaveapp.controller('login', function($scope, dataService,dataFactory, $window,$cookies) {
  $scope.login = function(input) {
    console.log(input);
    dataFactory.logInApi(input).then(function(response) {
      var user = response.data.data;
      dataService.setZWAYSession(user.sid);
      dataService.setUser(user);
      dataService.setLastLogin(Math.round(+new Date() / 1000));
      $window.location.href = '#/main';
      //$window.location.reload();
    }, function(error) {
      $scope.loading = false;
    });
  };
  $scope.getSession = function () {
        var hasCookie = ($cookies.user) ? true : false;
        dataFactory.sessionApi().then(function (response) {
            $scope.processUser(response.data.data);
            if (!hasCookie) {
                window.location = '/';
                //()$window.location.reload();
            }
        });
    };
});
