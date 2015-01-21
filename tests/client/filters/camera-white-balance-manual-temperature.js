/*global angular*/

define([
    'intern/chai!expect',
    'intern!bdd',
    'intern/order!angular/angular',
    'intern/order!clientJS/filters/camManager-filters',
    'intern/order!clientJS/filters/camera-white-balance-manual-temperature-filter'
], function(expect, bdd) {

    function inject(fn) {
        return function() {
            angular.injector(['ng', 'camManager.filters']).invoke(fn);
        }
    }

    bdd.describe('whiteBalanceManualTemperature filter', function() {

        var filter = null;

        bdd.beforeEach(inject(function($filter) {
            filter = $filter;
        }));

        bdd.it('should output a human readable string', function() {
            expect(filter('whiteBalanceManualTemperature')(5)).to.equal('5000 K');
        });

    });
});
