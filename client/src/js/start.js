'use strict';

angular.module('camManager', [
        'ngSanitize',
        'ngResource',
        'restangular',
        'xeditable',
        'ui.bootstrap'
    ])
    .config(['RestangularProvider',
        function(RestangularProvider) {
            RestangularProvider.setBaseUrl('/api/');
        }
    ]);
