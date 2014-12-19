'use strict';

var request         = require('request').defaults({
        encoding: null
    }),
    fs              = require('fs-extended'),
    randombase64    = require('randombase64'),
    connectedWifi   = null,
    Wifitools       = require('./utils/wifi-tool'),
    wifiClient      = new Wifitools(),
    localCamIP      = '192.168.42.1';

module.exports = function(app) {

    app.route('/api/life')
        .get(function(req, res, next) {
            res.send(true);
        });

    app.route('/api/camera/:id/connect')
        .get(function(req, res, next) {
            var cameraId = req.params.id;
            wifiClient.connectToNetwork('QBIC-VOG-' + cameraId, '0123456789').then(function() {
                setTimeout(function() {
                    //Test correct connection after 5s
                    connectedWifi = wifiClient.getCurrentWifiNetwork();
                    console.log('connectedWifi: ', connectedWifi);
                    res.sendStatus(200);
                }, 5000);
            });
        });

    app.route('/api/camera/thumb')
        .get(function(req, res, next) {
            var _cameraId = req.params.id,
                _contentType = null,
                _finalURI = null;

            /*
            request('http://' + localCamIP + '/mjpeg/amba.jpg', function(error, response, body) {
                _finalURI = 'data:image/jpg;base64,' + new Buffer(body).toString('base64');
                res.send(_finalURI);
            });
            */
           
            randombase64.generate({
                height     : 240,
                width      : 400,
                withPrefix  : true
            }, function(err, str) {
                res.send(str);
            });
        });

    app.route('/api/camera/settings')
        .get(function(req, res, next) {

            var mockData = [{
                "stream_type": "mjpg"
            }, {
                "std_def_video": "on"
            }, {
                "stream_while_record": "on"
            }, {
                "video_resolution": "1920x1080 30P 16:9"
            }, {
                "el_wdr": "off"
            }, {
                "el_angle_deg": "170"
            }, {
                "el_white_balance": "auto"
            }, {
                "el_warp_correction": "off"
            }, {
                "el_stabilization": "off"
            }, {
                "el_ae_exposure_level": "0"
            }, {
                "el_ae_light_metering": "center"
            }, {
                "el_image_rotation": "off"
            }, {
                "el_rec_duration": "30min"
            }, {
                "el_burst_per_sec": "60"
            }, {
                "el_speaker_volume": "0"
            }, {
                "el_self_timer": "off"
            }, {
                "el_battery": "97"
            }, {
                "el_capture_mode": "single"
            }, {
                "el_interval_time": "00:00:30"
            }, {
                "el_get_version": "01.02.0006"
            }, {
                "el_wifi_auto_power_off": "disable"
            }, {
                "el_get_ac_connection": "disconnected"
            }, {
                "el_rec_audio_level": "5"
            }, {
                "el_rec_audio_balance": "0"
            }, {
                "el_auto_power_off": "off"
            }, {
                "el_ae_control": "manual"
            }, {
                "el_ae_manual_gain": "10"
            }, {
                "el_ae_manual_shutter": "16"
            }, {
                "el_wb_control": "manual"
            }, {
                "el_wb_manual_temp": "1"
            }, {
                "el_destination": "eu"
            }, {
                "app_status": "idle"
            }, {
                "camera_clock": "2014-12-16 13:44:43"
            }];

            var reformatData = function(data) {
                var _result = {},
                    len = data.length,
                    i = 0;

                for(i; i<len; i++) {
                    for(var k in data[i]) {
                        _result[k] = data[i][k];
                    }
                }

                return _result;
            };

            res.json(reformatData(mockData));
        });
};
