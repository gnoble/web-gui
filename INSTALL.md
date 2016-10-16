# Instalation

To install the web interface we need 3 apis , Kwh, kw, restdb and ZWaveAPI. All the api path can be config on the js/app/config.js


## Kwh.php
Is a backed to get power consumition in real time, is an script called Kwh.php. This script MUST the reachable on the web-site.

## KW.php
Is a backend script to get data from past power consumition , this script MUST be reachable by the web-app.


## Restdb
Is a rest interface for the database to save and retrieve data, It MUST be reachable by the web-app.

## ZWaveAPI

Is the api to get data from the Zwave devices, MUST be reachable by the web-app, the way to make this is to user a reverse proxy:

1. Fist download and enable proxy mod for apache server:
```
apt-get install libapache2-mod-proxy-html
```
2. Then enable it
```
a2enmod proxy proxy_http
```
3. On the Virtualhost add the lines:
```
ProxyPass /ZWaveAPI  http://192.168.10.245:8083/ZWaveAPI/
ProxyPassReverse /ZWaveAPI  http://192.168.10.245:8083/ZWaveAPI/
```
Both lines are needed.
4. For Mqtt API add the nexts lines too:
```
ProxyPass /mqtt  http://192.168.10.245:8083/mqtt/
ProxyPassReverse /mqtt  http://192.168.10.245:8083/mqtt
```
And dont forget to add mqtt file modules to the z-wave-server
