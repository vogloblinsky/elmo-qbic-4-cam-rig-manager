'use strict';

angular.module('camManager').factory('CameraFactory',
    ['$interval',
    'CameraService',
    'SETTINGS',
    function($interval,
        CameraService,
        SETTINGS) {

        var CameraFactory = {},

        /* Privates fx */

        _camerasData = {
            1: {},
            2: {},
            3: {},
            4: {}
        },

        _selectedCamera = 0,

        _thumbPullingInterval = null,
        _settingsPullingInterval = null,

        CameraServiceCallThumb = function() {
            CameraService.getThumb().then(function(picture) {
                if (picture === 'ok') {
                    _camerasData[_selectedCamera].picture = 'http://192.168.42.1/mjpeg/amba.jpg?ts=' + Date.now();
                } else {
                    _camerasData[_selectedCamera].picture = picture;
                }
            });
        },

        CameraServiceCallSettings = function() {
            CameraService.getSettings().then(function(settings) {
                console.log(settings.plain());
                _camerasData[_selectedCamera].settings = settings.plain();
            });
        };

        /* Public fx */

        CameraFactory.startCameraPulling = function() {
            CameraServiceCallThumb();
            CameraServiceCallSettings();

            _thumbPullingInterval = $interval(function() {
                CameraServiceCallThumb();
            }, SETTINGS.TIME_PULLING_THUMB);

            _settingsPullingInterval = $interval(function() {
                CameraServiceCallSettings();
            }, SETTINGS.TIME_PULLING_SETTINGS);
        };

        CameraFactory.camerasData = function() {
            return _camerasData;
        };

        CameraFactory.cameraData = function(id) {
            return _camerasData[id];
        };

        CameraFactory.addCamera = function(id) {
            _camerasData[id] = {};
        };

        CameraFactory.selectCamera = function(id) {
            _selectedCamera = id;
            if (angular.isDefined(_thumbPullingInterval)) {
                $interval.cancel(_thumbPullingInterval);
                _thumbPullingInterval = undefined;
            }
            if (angular.isDefined(_settingsPullingInterval)) {
                $interval.cancel(_settingsPullingInterval);
                _settingsPullingInterval = undefined;
            }
            return CameraService.connect(id);
        };

        CameraFactory.setSetting = function(type, value) {
            CameraService.setSetting(type, value);
        };

        return CameraFactory;

    }
]);
