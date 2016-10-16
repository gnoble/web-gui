zwaveapp.controller('menu_user', function ($scope) {
  $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    }
});
