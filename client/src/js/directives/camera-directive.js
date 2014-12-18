'use strict';

angular.module('camManager')
    .directive('camera', ['CameraFactory', function(CameraFactory) {
        return {
            templateUrl: './templates/camera-detail.html',
            restrict: 'AE',
            scope: {
                id: '=cameraId',
                thumb: '=thumb'
            },
            link: function (scope, element, attrs) {
                console.log('link: ', scope, attrs);
            }
        }
    }]);
