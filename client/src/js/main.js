'use strict';

angular.module('camManager')
    .controller('MainCtrl', [
        '$scope',
        '$interval',
        'LifeService',
        'CameraService',
        function(
            $scope,
            $interval,
            LifeService,
            CameraService) {

            $scope.connectedCam = null;

            var LifeServiceCall = function() {
                LifeService.get().then(function(state) {
                    $scope.lifeState = state;
                });
            };

            LifeServiceCall();
            $interval(function() {
                LifeServiceCall();
            }, 15000);

            $scope.cameraThumb = null;
            /*
            var CameraServiceCall = function() {
                CameraService.getThumb('cam1').then(function(picture) {
                    $scope.cameraThumb = picture;
                });
            };

            CameraServiceCall();
            $interval(function() {
                CameraServiceCall();
            }, 2000); 
            */           

        }
    ]);
