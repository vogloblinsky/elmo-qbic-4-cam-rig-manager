/*global angular*/

define([
    'intern/chai!expect',
    'intern!bdd',
    'intern/order!angular/angular',
    'intern/order!clientJS/filters/camManager-filters',
    'intern/order!clientJS/filters/camera-shutter-speed-filter'
], function(expect, bdd) {

    function inject(fn) {
        return function() {
            angular.injector(['ng', 'camManager.filters']).invoke(fn);
        }
    }

    bdd.describe('shutterSpeed filter', function() {

        var filter = null;

        bdd.beforeEach(inject(function($filter) {
            filter = $filter;
        }));

        bdd.it('should output the corresponding shutter speed string', function() {
            expect(filter('shutterSpeed')(1)).to.equal('1/8000');
            expect(filter('shutterSpeed')(3)).to.equal('1/3000');
            expect(filter('shutterSpeed')(5)).to.equal('1/1500');
        });

    });
});
