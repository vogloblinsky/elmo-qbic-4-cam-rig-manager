'use strict';

angular.module('camManager')
    .directive('camera', ['CameraFactory', function(CameraFactory) {
        return {
            templateUrl: './templates/camera-detail.html',
            scope: {
                id: '=cameraId',
                cameraData: '=',
                rigOrientation: '='
            },
            link: function(scope, elem, attr) {
                scope.updateExposureLevel = function(value) {
                    CameraFactory.setSetting('el_ae_exposure_level', value);
                };
            }
        }
    }]);
