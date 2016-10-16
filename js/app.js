/*Config module*/

var config_module = angular.module('myAppConfig', []);

angular.forEach(zwave_config, function(key, value) {
  config_module.constant(value, key);
});

var zwaveapp = angular.module('zwaveapp', [
  'highcharts-ng',
  'ngResource',
  'ngRoute',
  'ui.sortable',
  'toggle-switch',
  'datePicker',
  'ngCookies', /*Necesary for Zwave services*/
  'myAppConfig',
  'myAppService', /*Zway services*/
  'myAppFactory' /*Zway factories*/
]);
zwaveapp.factory('Devices', function($resource, $location) {
  //var server = $location.protocol()+'://'+ $location.host()+ ':' + $location.port() +'/'+ materialConfig.restdb;
  return $resource(materialConfig.restdb + '/devices/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(data, headers) {
        var devices = angular.fromJson(data);
        if (!devices || devices.error) {
          return [];
        }
        for (var i = 0; i < devices.length; i++) {
          for (var key in devices[i]) {
            if (key != 'name') {
              devices[i][key] = parseInt(devices[i][key], 10);
            }
            if (key == 'enabled') {
              devices[i][key] = (devices[i][key] !== 0);
            }
          }
        }
        return devices;
      }
    },
    create: {
      method: 'POST'
    },
    show: {
      method: 'GET'
    },
    update: {
      method: 'PUT',
      params: {
        id: '@id'
      },
      transformRequest: function(data, headersGetter) {
        var obj = {
          enabled: data.enabled,
          id: data.id,
          name: data.name,
          priority: data.priority,
          threshold_can_be_off: data.threshold_can_be_off,
          threshold_must_be_on: data.threshold_must_be_on,
          zwave_id: data.zwave_id
        };
        return JSON.stringify(obj);
      }
    },
    'delete': {
      method: 'DELETE',
      params: {
        id: '@id'
      }
    }
  });
});
zwaveapp.factory('Mqtt', function($http, $location) {
  var MqttFactory = {};
  var url = materialConfig.mqtt;
  MqttFactory.save = function(devices, cb) {
    return $http.post(url, devices).then(function(response) {
      if (cb)
        cb(response);
    });
  };
  return MqttFactory;
});
zwaveapp.directive('ngMin', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelController) {
      ngModelController.$parsers.push(function(data) {
        //convert data from view format to model format
        data = Math.round(parseInt(data) * 60);
        return data; //converted
      });

      ngModelController.$formatters.push(function(data) {
        //convert data from model format to view format
        data = Math.round(parseInt(data) / 60);
        return data; //converted
      });
    }
  }
});
zwaveapp.factory('Zway', function($http, $location) {
  ZwayFactory = {};
  //'http://hvaler.larry.no:8083/ZWaveAPI/Run/devices[7].instances[0].commandClasses[37].data.level.value'
  //'http://hvaler.larry.no:8083/ZWaveAPI/Run/devices[7].instances[0].commandClasses[32].data.level.value'
  //http://hvaler.larry.no:8083/ZWaveAPI/Run/devices[13].instances[0].commandClasses[64].data.mode.value
  //var base_url = $location.protocol()+'://'+ $location.host()+ ':' + '8083' + '/' + 'ZWaveAPI/Run/devices';
  var base_url = '/ZWaveAPI/Run/devices';
  /*Set(1),Set(0)*/
  var thermostat = {
    commandClass: 64,
    name: "Thermostat",
    getUrl: 'data.mode.value'
  };
  var binary = {
    commandClass: 37,
    name: "Switch",
    getUrl: 'data.level.value'
  };
  var generic = {
    commandClass: 32,
    name: "Generic",
    getUrl: 'data.level.value'
  };
  var priority = [
    thermostat,
    binary,
    generic
  ];
  ZwayFactory.GetDevices = function(cb) {
    return $http.get(base_url).then(function(response) {
      devices = [];
      var controlled_devices = []
      devices = response.data; /*devices on zway*/
      for (var id in devices) {
        var new_device = {};
        new_device.zwave_id = id;
        for (var instance in devices[id].instances) {
          var commandClasses = [];
          for (var commandClass in devices[id].instances[instance].commandClasses) { /*aqui siempre aparece el 32 primero*/
            commandClasses.push(commandClass); /*Array with the commandClasses supported*/
          }
          commandClasses.reverse(); /*biggers first*/
          for (var i = 0; i < priority.length; i++) {
            for (var j = 0; j < commandClasses.length; j++) {
              if (commandClasses[j] == priority[i].commandClass) {
                new_device.commandClass = priority[i].commandClass;
                new_device.getUrl = priority[i].getUrl;
                new_device.name = priority[i].name;
                break;
              }
              if (new_device.commandClass)
                break;
            }
          }
        }
        controlled_devices.push(new_device);
      }
      if (cb)
        cb(controlled_devices)
      else
        return controlled_devices = [];
    });
  }
  ZwayFactory.get = function(device, cb) {
    var url = base_url + '[' + device.zwave_id + ']' + '.instances[0].' + 'commandClasses[' + device.commandClass + '].' + device.getUrl;
    return $http.get(url).then(function(response) {
      device.zwave_enabled = response.data;
      if (cb)
        cb(device);
      return device;
    }, function(response) {
      device.zwave_enabled = null;
      if (cb)
        cb(device);
      return device;
    });
  };
  ZwayFactory.set = function(device, cb) {
    var url = base_url + '[' + device.zwave_id + ']' + '.instances[0].' + 'commandClasses[' + device.commandClass + '].';
    if (device.zwave_enabled)
      url = url + 'Set(1)';
    else
      url = url + 'Set(0)';
    return $http.get(url).then(function(response) {
      if (!response.data)
        return;
      cb(response.data);
    });
  };
  return ZwayFactory;
});
zwaveapp.factory('KWh', function($http, $location) {
  var KWhFactory = {};
  //var url = $location.protocol()+'://'+ $location.host()+ ':' + $location.port() + '/' + materialConfig.url;
  /*Return an Array with months*/
  function ParseRequestYear(data) {
    var samples = [];
    for (var i = 0; i < data.length; i++) {
      samples.push({
        kWh: parseFloat(data[i].kWh),
        kw: parseFloat(data[i].kilowatt),
        Date: Date.parse(data[i].Date)
      });
    }
    return samples;
  };
  KWhFactory.Year = function(cb) {
    var now = new Date();
    var last_year = new Date();
    last_year.setFullYear(now.getFullYear() - 1);
    /*Unix time*/
    var ufrom = Math.floor(last_year.getTime() / 1000);
    var uto = Math.floor(now.getTime() / 1000);
    return $http.get(materialConfig.url + '?datefrom=' + ufrom + '&dateto=' + uto + '&group=month').then(function(response) {
      if (response.data)
        response.data = ParseRequestYear(response.data);
      cb(response);
    });
  };
  KWhFactory.getLast = function(samples,cb) {
    var begin = new Date();
    /*Unix time*/
    return $http.get(materialConfig.url + '?samples=' + samples).then(function(response) {
      if (response.data)
        response.data = ParseRequestYear(response.data);
      if (cb)
        cb(response);
    });
  };
  return KWhFactory;
});
zwaveapp.factory('KW', function($http, $location) {
  var KWFactory = {};
  //var url = $location.protocol()+'://'+ $location.host()+ ':' + $location.port() + '/' +materialConfig.kw;
  //console.log(url);
  /*Return an Array with months*/
  function ParseRequestYear(data) {
    var samples = [];
    for (var i = 0; i < data.length; i++) {
      samples.push({
        Kw: parseFloat(data[i].Kw),
        Date: parseInt(data[i].Date) * 1000
      });
    }
    return samples;
  };
  KWFactory.Get = function(granularity, date_begin, date_end, cb) {

    var begin = new Date(date_begin);
    var end = new Date(date_end);
    /*Unix time*/
    var ufrom = Math.min(Math.floor(begin.getTime() / 1000), Math.floor(end.getTime() / 1000));
    var uto = Math.max(Math.floor(begin.getTime() / 1000), Math.floor(end.getTime() / 1000));
    return $http.get(materialConfig.kw + '?datefrom=' + ufrom + '&dateto=' + uto + '&group=' + granularity).then(function(response) {
      if (response.data)
        response.data = ParseRequestYear(response.data);
      if (cb)
        cb(response);
    });
  };
  return KWFactory;
});
zwaveapp.config(function($routeProvider) {
  $routeProvider
    .when("/devices", {
      templateUrl: "tabs/devices.html",
      controller: "devicescontroller"
    }).when('/energy', {
      templateUrl: "tabs/energy.html",
    }).when('/subcription', {
      templateUrl: "tabs/subcription.html"
    }).when('/admin', {
      templateUrl: "tabs/admin.html",
      controller: "login"
    }).otherwise({
      templateUrl: "tabs/main.html",
      controller: "devicescontroller"
    });
});

zwaveapp.config(function($provide, $httpProvider) {
  $httpProvider.defaults.timeout = 5000;
  // Intercept http calls.
  $provide.factory('MyHttpInterceptor', function($q, $location, dataService) {
    return {
      responseError: function(rejection) {
        dataService.logError(rejection);
        if (rejection.status == 401 || rejection.status == 403) {
          dataService.logOut();
          return $q.reject(rejection);
        } else {
          // Return the promise rejection.
          return $q.reject(rejection);
        }
      }
    };
  });
  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('MyHttpInterceptor');
});
