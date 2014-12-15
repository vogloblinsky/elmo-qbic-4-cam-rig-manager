'use strict';

angular.module('camManager', [
        'ngSanitize',
        'ngResource',
        'restangular'
    ])
    .config(['RestangularProvider',
        function(RestangularProvider) {

            RestangularProvider.setBaseUrl('/api/');
        }
    ]);
