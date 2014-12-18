'use strict';

angular.module('camManager')
    .directive('camera', function() {
        return {
            templateUrl: './templates/camera-detail.html',
            scope: {
                id: "=cameraId"
            }
        }
    });
