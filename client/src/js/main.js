'use strict';

angular.module('camManager')
    .controller('MainCtrl', [
        '$scope',
        '$interval',
        'LifeService',
        'CameraFactory',
        'SETTINGS',
        function(
            $scope,
            $interval,
            LifeService,
            CameraFactory,
            SETTINGS) {

            var LifeServiceCall = function() {
                LifeService.get().then(function(state) {
                    $scope.lifeState = state;
                });
            };
            LifeServiceCall();
            $interval(function() {
                LifeServiceCall();
            }, SETTINGS.TIME_PULLING_LIFE);

            $scope.connectedCam = null;
            var watcherSelectedCamera = $scope.$watch('connectedCam', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    CameraFactory.selectCamera(newValue).then(CameraFactory.startCameraPulling);
                }
            });

            $scope.camerasData = CameraFactory.camerasData();

            $scope.rigOrientation = 'up';
        }
    ]);
