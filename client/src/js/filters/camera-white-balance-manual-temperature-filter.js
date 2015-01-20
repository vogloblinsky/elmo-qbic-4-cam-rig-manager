'use strict';

angular.module('camManager.filters').filter('whiteBalanceManualTemperature', function() {
    return function(input) {
        return input * 1000;
    };
});
