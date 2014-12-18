'use strict';

angular.module('camManager').factory('CameraFactory',
    ['$interval',
    'CameraService',
    'SETTINGS',
    function($interval,
        CameraService,
        SETTINGS) {

        var CameraFactory = {};

        /* Privates fx */

        var _camerasData = {
            '1': {},
            '2': {},
            '3': {},
            '4': {}
        },
            _selectedCamera = 0;

        var CameraServiceCall = function() {
            CameraService.getThumb().then(function(picture) {
                console.log('picture: ', picture);
                _camerasData[_selectedCamera].picture = picture;
                console.log(_camerasData);
            });
            CameraService.getSettings().then(function(settings) {
                console.log('settings: ', settings);
                _camerasData[_selectedCamera].settings = settings;
            });
        };

        /* Public fx */

        CameraFactory.startCameraPulling = function() {
            CameraServiceCall();
            $interval(function() {
                CameraServiceCall();
            }, SETTINGS.TIME_PULLING_THUMB);
        };

        CameraFactory.camerasData = function() {
            return _camerasData;
        };

        CameraFactory.addCamera = function(id) {
            _camerasData[id] = {};
        };

        CameraFactory.selectCamera = function(id) {
            _selectedCamera = id;
        };

        return CameraFactory;

    }
]);