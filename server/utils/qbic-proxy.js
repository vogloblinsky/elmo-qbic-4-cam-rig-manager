'use strict';

var Q                       = require('q'),
    request                 = require('request'),
    constants               = require('./constants.js'),
    randombase64            = require('randombase64'),
    wifiClient              = require('./wifi-tool'),

    apiEndPoint             = 'http://' + constants.localIPCamera + '/cgi-bin/cgi',

    token                   = null,
    connectedCameraId       = null,
    connectedToCamera       = false,
    streamingActivated      = false,

    mockCameraSettings      = [{'stream_type':'mjpg'},{'std_def_video':'on'},{'stream_while_record':'on'},{'video_resolution':'1920x1080 30P 16:9'},{'el_wdr':'off'},{'el_angle_deg':'170'},{'el_white_balance':'auto'},{'el_warp_correction':'off'},{'el_stabilization':'off'},{'el_ae_exposure_level':'0'},{'el_ae_light_metering':'center'},{'el_image_rotation':'off'},{'el_rec_duration':'30min'},{'el_burst_per_sec':'60'},{'el_speaker_volume':'0'},{'el_self_timer':'off'},{'el_battery':'97'},{'el_capture_mode':'single'},{'el_interval_time':'00:00:30'},{'el_get_version':'01.02.0006'},{'el_wifi_auto_power_off':'disable'},{'el_get_ac_connection':'disconnected'},{'el_rec_audio_level':'5'},{'el_rec_audio_balance':'0'},{'el_auto_power_off':'off'},{'el_ae_control':'manual'},{'el_ae_manual_gain':'10'},{'el_ae_manual_shutter':'16'},{'el_wb_control':'manual'},{'el_wb_manual_temp':'1'},{'el_destination':'eu'},{'app_status':'idle'},{'camera_clock':'2014-12-16 13:44:43'}],

    messageIds = {
        cameraParams: 3,
        streamOnPart1: 2,
        streamOnPart2: 259,
        heartBeat: 260,
        token: 257
    };

var getToken = function() {
    console.log('getToken');
    var deferred = Q.defer();

    request.post({
        url: apiEndPoint,
        form: '{"msg_id":' + messageIds.token + ', "token": 0}'
    }, function(err, httpResponse, body) {
        token = JSON.parse(body).param;
        console.log('token: ', token);
        deferred.resolve(token);
    });

    return deferred.promise;
};

var getHeartBeat = function() {
    console.log('getHeartBeat');
    var deferred = Q.defer();

    request.post({
        url: apiEndPoint,
        form: '{"msg_id":' + messageIds.heartBeat + ', "token": ' + token + '}'
    }, function(err, httpResponse, body) {
        var result = JSON.parse(body);
        if (result.rval === 0 && result.msg_id === messageIds.heartBeat) {
            deferred.resolve();
        } else {
            deferred.reject();
        }
    });

    return deferred.promise;
};

var reformatArrayFromCamera = function(data) {
    var _result = {},
        len = 0,
        i = 0;

    len = (typeof data !== 'undefined') ? data.length : 0;

    for (i; i < len; i++) {
        for (var k in data[i]) {
            //Parse numbers too
            if (isNaN(data[i][k])) {
                _result[k] = data[i][k];
            } else {
                _result[k] = parseInt(data[i][k]);
            }
        }
    }

    return _result;
};

var getCameraSettings = function(req, res, next) {

    var _call = function() {
        request.post({
            url: apiEndPoint,
            form: '{"msg_id":' + messageIds.cameraParams + ', "token": ' + token + '}'
        }, function(err, httpResponse, body) {
            var params = JSON.parse(body).param;
            res.json(reformatArrayFromCamera(params));
        });
    };

    if (connectedToCamera && token !== null) {
        _call();
    } else if (connectedToCamera && token === null) {
        getToken().then(_call);
    } else {
        res.json(reformatArrayFromCamera(mockCameraSettings));
    }
};

var activateStreaming = function() {
    var deferred = Q.defer();

    request.post({
        url: apiEndPoint,
        form: '{"msg_id":' + messageIds.streamOnPart1 + ', "param": "on", "type": "stream_while_record", "token": ' + token + '}'
    }, function(err, httpResponse, body) {
        var resultPart1 = JSON.parse(body);

        console.log('resultPart1: ', resultPart1);

        if (resultPart1.msg_id === messageIds.streamOnPart1 && resultPart1.type === 'stream_while_record') {
            request.post({
                url: apiEndPoint,
                form: '{"msg_id":' + messageIds.streamOnPart2 + ', "param": "none_force", "token": ' + token + '}'
            }, function(err, httpResponse, body) {
                var resultPart2 = JSON.parse(body);

                console.log('resultPart2: ', resultPart2);

                if (resultPart2.msg_id === messageIds.streamOnPart2) {
                    streamingActivated = true;
                    deferred.resolve(token);
                }
            });
        }
    });

    return deferred.promise;
};

var getCameraThumb = function(req, res, next) {

    var _cameraId = req.params.id,
        _contentType = null,
        _finalURI = null;

    var _callThumb = function() {
        request('http://' + constants.localIPCamera + '/mjpeg/amba.jpg', function(error, response, body) {
            //console.log(response);
            //_finalURI = 'data:image/jpeg;base64,' + new Buffer(body).toString('base64');
            res.send('ok');
        });
    };

    if (connectedToCamera && token !== null && streamingActivated) {
        _callThumb();
    } else if (connectedToCamera && token === null && !streamingActivated) {
        getToken().then(getHeartBeat).then(activateStreaming).then(_callThumb);
    } else {
        // Send random noise image
        randombase64.generate({
            height: 240,
            width: 424,
            withPrefix: true
        }, function(err, str) {
            res.send(str);
        });
    }
};

var connectToCamera = function(req, res, next) {
    var cameraId = req.params.id,
        token = null,
        timeoutConnect = 5000,

        _connect = function() {
            wifiClient.connectToNetwork(constants.namespaceCameraName + cameraId, constants.defaultCameraPassword).then(function() {
                setTimeout(function() {
                    //Test correct connection after 5s
                    wifiClient.getCurrentWifiNetwork().then(function(name) {
                        connectedCameraId = name;
                    });
                    connectedToCamera = true;
                    console.log('connectedCameraId 2: ', connectedCameraId);
                    res.sendStatus(200);
                }, timeoutConnect);
            });
        };

    //First test is not already connected to desired camera
    wifiClient.getCurrentWifiNetwork().then(function(name) {
        if (constants.namespaceCameraName + cameraId === name) {
            connectedToCamera = true;
            connectedCameraId = name;
            console.log('connectedCameraId 1: ', connectedCameraId);
            res.sendStatus(200);
        } else {
            connectedToCamera = false;
            _connect();
        }
    });
};

var qbicProxy = {
    getCameraSettings: getCameraSettings,
    getCameraThumb: getCameraThumb,
    connectToCamera: connectToCamera
};

module.exports = qbicProxy;
