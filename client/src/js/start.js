'use strict';

angular.module('camManager', [
        'ngSanitize',
        'ngResource',
        'restangular',
        'xeditable',
        'ui.bootstrap',
        'camManager.filters'
    ])
    .config(['RestangularProvider',
        function(RestangularProvider) {
            RestangularProvider.setBaseUrl('/api/');
        }
    ])
    .constant('SETTINGS', {
        TIME_PULLING_THUMB: 2000,
        TIME_PULLING_SETTINGS: 2000,
        TIME_PULLING_LIFE: 15000
    });
