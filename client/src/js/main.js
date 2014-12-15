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

            $interval(function() {
                LifeService.get().then(function(state) {
                    console.log('life state: ', state);
                    $scope.lifeState = state;
                });
            }, 2000);

        }
    ]);
