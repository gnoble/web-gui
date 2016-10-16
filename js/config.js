/* URLS */
var materialConfig = {
  url: 'api/kwh.php',
  kw: 'api/kw.php',
  month_url: 'api/month.php',
  restdb: 'restdb',
  mqtt: 'mqtt'
};

var zwave_config = {
  'cfg': {
    //Application name
    'app_name': 'SHUI',
    // Application version
    'app_version': '1.0.1',
    // Server base url
    'server_url': '/',
    //'server_url': 'http://192.168.10.119:8083/',
    // Interval in miliseconds to refresh data
    'interval': 3000,
    // Interval in miliseconds (5 min) to clear history (json) cache
    'history_cache_interval': 300000,
    // List of API URLs
    'api': {
      'devices': 'ZAutomation/api/v1/devices',
      'hide_devices': 'ZAutomation/api/v1/hidedevices',
      'profiles': 'ZAutomation/api/v1/profiles',
      'profiles_auth_update': 'ZAutomation/api/v1/auth/update',
      'locations': 'ZAutomation/api/v1/locations',
      'notifications': 'ZAutomation/api/v1/notifications',
      'modules': 'ZAutomation/api/v1/modules',
      'modules_categories': 'ZAutomation/api/v1/modules/categories',
      'online_install': 'ZAutomation/api/v1/modules/install',
      'instances': 'ZAutomation/api/v1/instances',
      'namespaces': 'ZAutomation/api/v1/namespaces',
      'history': 'ZAutomation/api/v1/history',
      'login': 'ZAutomation/api/v1/login',
      'backup': 'ZAutomation/api/v1/backup',
      'restore': 'ZAutomation/api/v1/restore'
    },
    // Api url
    'api_url': 'ZAutomation/api/v1/',
    // ZWave api url
    'zwave_api_url': 'ZWaveAPI/',
    // ZWave JS url
    'zwave_js_url': 'JS/',
    // Local data path
    'local_data_url': 'storage/data/',
    // Help data path
    'help_data_url': 'storage/help/',
    // Url to zddx xml files
    'zddx_url': 'ZDDX/',
    // Url to run ExpertUI cmd
    'zwaveapi_run_url': 'ZWaveAPI/Run/',
    // Url to run Enocean cmd
    'enocean_run_url': 'EnOceanAPI/Run/',
    // Url to data Enocean cmd
    'enocean_data_url': 'EnOceanAPI/Data/',
    // EnOcean device black list
    'enocean_black_list': ['81048201'],
    // Url to config XML file
    'cfg_xml_url': 'config/Configuration.xml',
    // Language directory
    'lang_dir': 'app/lang/',
    // Default language
    'lang': 'en', // !!!!Do not change it
    // List of supported languages
    'lang_list': ['en', 'de', 'ru', 'cn', 'fr'],
    // Role access
    'role_access': {
      admin: [1],
      admin_user: [1],
      apps: [1, 3],
      apps_local: [1, 3],
      apps_online: [1, 3],
      module: [1, 3],
      devices: [1, 3],
      myaccess: [1, 2, 3],
      expert_view: [1, 3],
      remote_access: [1, 3],
      devices_include: [1, 3],
      rooms: [1, 2, 3],
      element: [1, 2, 3],
      event_delete: [1, 3],
      config_rooms: [1, 3],
      config_rooms_id: [1, 3],
      network: [1, 3],
      network_config_id: [1, 3],
      logout: [1, 2, 3, 4]
    },
    // List of language codes
    'lang_codes': {
      'en': 'en_EN',
      'de': 'de_AT',
      'ru': 'en_EN',
      'fr': 'fr_FR'
    },
    // User default
    'user_default': {
      'id': 1,
      'role': 1,
      'color': '#dddddd',
      'lang': 'en',
      'interval': 3000,
      'expert_view': false
    },
    // List of profile colors
    'profile_colors': ['#dddddd', '#6c7a89', '#6494bc', '#80ad80', '#31b0d5', '#f0aD4e', '#d9534f', '#dd976e'],
    // Chart colors
    'chart_colors': {
      fillColor: 'rgba(151,187,205,0.5)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff'
    },
    // Device vendors
    'device_vendors': ['zwave', 'enocean', 'ipcamera'],
    // Element control
    'element_control': ['switchMultilevel', 'thermostat', 'sensorMultiline'],
    // Room images
    'room_images': [
      'kitchen.jpg',
      'bathroom.jpg',
      'sleeping_room.jpg',
      'living_room.jpg'
    ],
    // List of the clicakble event levels
    'events_clickable': [
      'device-info'
    ],
    // List of the categories of elements with update command
    'element_update_icon': [
      'switchBinary',
      'switchMultilevel',
      'doorlock',
      'switchControl'
    ],
    // List of the elements with update time button
    'element_update_time_btn': [
      'sensorMultilevel',
      'sensorBinary',
      'sensorMultiline'
    ],
    // List of the find hosts
    'find_hosts': [
      'find.zwave.me',
      'find.popp.eu'
    ],
    // Results per page
    'page_results': 12,
    // Results per events page
    'page_results_events': 50,

    // ---------------------------------- Custom config for specifics app_type ---------------------------------- //
    // Application type : default/popp/wd
    'app_type': 'default',
    // Config
    'custom_cfg': {
      'default': {
        'logo': 'app/img/app-logo-default.png',
        hidden_apps: [
          'Cron',
          'BatteryPolling',
          'CustomUserCode',
          'CustomUserCodeLoader',
          'InbandNotifications',
          'Notification',
          'NotificationSMSru',
          'RemoteAccess',
          'SecurityMode',
          'SensorValueLogging',
          'SensorsPollingLogging',
          'YandexProbki',
          'CodeDevice',
          'InfoWidget',
          'SensorsPolling',
          'SwitchControlGenerator',
          'ZWave'
        ]
      },
      'popp': {
        'logo': 'app/img/app-logo-popp.png',
        'hidden_apps': [
          'Cron',
          'CodeDevice',
          'BatteryPolling',
          'CustomUserCode',
          'CustomUserCodeLoader',
          'InbandNotifications',
          'Notification',
          'NotificationSMSru',
          'RemoteAccess',
          'SecurityMode',
          'SensorValueLogging',
          'SensorsPollingLogging',
          'YandexProbki',
          'InfoWidget',
          'SensorsPolling',
          'SwitchControlGenerator',
          'ZWave'
        ]
      },
      'wd': {
        'logo': 'app/img/app-logo-wd.png',
        'hidden_apps': [
          'Cron',
          'BatteryPolling',
          'CodeDevice',
          'CustomUserCode',
          'CustomUserCodeLoader',
          'InbandNotifications',
          'Notification',
          'NotificationSMSru',
          'RemoteAccess',
          'SecurityMode',
          'SensorValueLogging',
          'SensorsPollingLogging',
          'YandexProbki',
          'InfoWidget',
          'SensorsPolling',
          'SwitchControlGenerator',
          'ZWave'
        ]
      }
    }
  }
};


Highcharts.setOptions({
  global: {
    useUTC: false
  }
});

var chartConfig = {
  options: {
    chart: {
      type: 'line',
      reflow: true
    },
    plotOptions: {
      line: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        }
      },
      area: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b %H:%M:%S}: {point.y:.2f} KW'
    }
  },
  series: [{
    data: [],
    name: 'Power usage'
  }],
  title: {
    text: 'Power usage last hour'
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Date'
    }
  },
  yAxis: {
    min: 0,
    plotLines: [{
      color: 'red',
      width: 2,
      label: {
        text: 'Max power usage this month'
      }
    }]
  },
  useHighStocks: false,
  loading: true
};

var gaugeConfig = {
  options: {
    chart: {
      type: 'gauge',
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0]
    },
    pane: {
      startAngle: -120,
      endAngle: 120,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }
    },
    gauge: {
      dataLabels: {
        borderWidth: 0
      }
    },
    tooltip: {
      enabled: false
    }
  },
  series: [{
    dataLabels: {
      enabled: true
    },
    dial: {
      radius: '90%'
    }
  }],
  title: {
    text: 'Current power usage'
  },
  yAxis: {
    currentMin: 0,
    currentMax: 10,
    stops: [
      [0, 'rgba(0, 0, 0, 0.4)']
    ],
    tickLength: 5,
    minorTickLength: 5,
    labels: {
      distance: -20,
      rotation: 'auto'
    },
    lineWidth: 0,
    tickWidth: 0,
    plotBands: [{
      outerRadius: '100%',
      innerRadius: '60%',
      from: 0,
      to: 5,
      color: '#B3FFB3',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)'
    }, {
      outerRadius: '100%',
      innerRadius: '60%',
      from: 5,
      to: 6,
      color: '#FFFFB3',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)'
    }, {
      outerRadius: '100%',
      innerRadius: '60%',
      from: 6,
      to: 100, // Should always be higher than what's possible to max.
      color: '#FFB3B3',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)'
    }]
  },
  loading: true
};

var kwhStory = {
  options: {
    chart: {
      type: 'column'
    }
  },
  chart: {},
  title: {
    text: 'Power Consumition'
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Date'
    }
  },
  yAxis: {
    title: {
      text: 'KWh'
    }
  },
  series: [],
  drilldown: {
    series: []
  }
};

var powerStory = {
  options: {
    chart: {
      type: 'line',
      reflow: true
    },
    plotOptions: {
      line: {
        lineWidth: 4,
        states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        }
      },
      area: {
        marker: {
          enabled: false
        }
      }
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '{point.x:%e. %b %y %H:%M:%S}: {point.y:.2f} KW'
    }
  },
  series: [],
  title: {
    text: 'Average Power Consumition ratio (KW)'
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Date'
    }
  },
  yAxis: {
    min: 0,
    plotLines: [{
      color: 'red',
      width: 2,
      label: {
        text: 'Max power usage this month'
      }
    }]
  },
  useHighStocks: false,
  loading: false
};
