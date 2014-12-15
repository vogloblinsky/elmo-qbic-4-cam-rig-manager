'use strict';

angular.module('camManager')
    .controller('MainCtrl', [
        '$scope',
        '$interval',
        'LifeService',
        function(
            $scope,
            $interval,
            LifeService) {

            var LifeServiceCall = function() {
                LifeService.get().then(function(state) {
                    $scope.lifeState = state;
                });
            };

            LifeServiceCall();
            $interval(function() {
                LifeServiceCall();
            }, 15000);

        }
    ]);
