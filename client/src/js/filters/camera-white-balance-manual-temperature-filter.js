'use strict';

angular.module('camManager.filters').filter('whiteBalanceManualTemperature', function() {
    return function(input) {
        return (typeof input !== 'undefined') ? (input * 1000) + ' K' : '';
    };
});
