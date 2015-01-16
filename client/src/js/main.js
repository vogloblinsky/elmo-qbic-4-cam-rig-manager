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


            var cameraPullingStarted = false;
            $scope.connectedCam = null;
            var watcherSelectedCamera = $scope.$watch('connectedCam', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    // Camera selected
                    if(!cameraPullingStarted) {
                        cameraPullingStarted = true;
                        CameraFactory.startCameraPulling();
                    }
                    CameraFactory.selectCamera(newValue);
                }
            });

            $scope.camerasData = CameraFactory.camerasData();

            $scope.rigOrientation = 'up';
        }
    ]);
