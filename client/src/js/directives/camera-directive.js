'use strict';

angular.module('camManager')
    .directive('camera', ['CameraFactory', function(CameraFactory) {
        return {
            templateUrl: './templates/camera-detail.html',
            scope: {
                id: "=cameraId"
            },
            controller: function($scope, $element, $attrs, $transclude) {
                CameraFactory.addCamera($scope.id);
                console.log(CameraFactory.camerasData());
            }
        }
    }]);
