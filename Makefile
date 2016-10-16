SCP = scp -r
SERVER_PATH = "root@larry.no:/var/www/smartlab"
LOCAL_PATH = ../material
MAIN = copy
SERVER = devd -o --debug . /api/=http://192.168.10.239/api /mqtt/=http://192.168.10.239/mqtt /ZWaveAPI/=http://192.168.10.239/ZWaveAPI /ZAutomation/=http://192.168.10.239/ZAutomation /restdb/=http://192.168.10.239/restdb
.PHONY: test clean

all:    $(MAIN)
	@echo  Coping to server

$(MAIN): $(LOCAL_PATH)
	$(SCP) $(LOCAL_PATH) $(SERVER_PATH)

test:
	$(SERVER)
