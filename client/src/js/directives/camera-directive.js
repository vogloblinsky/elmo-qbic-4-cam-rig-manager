'use strict';

angular.module('camManager')
    .directive('camera', ['CameraFactory', function(CameraFactory) {
        return {
            templateUrl: './templates/camera-detail.html',
            scope: {
                id: '=cameraId',
                cameraData: '='
            }
        }
    }]);
