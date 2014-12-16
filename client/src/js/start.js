'use strict';

angular.module('camManager', [
        'ngSanitize',
        'ngResource',
        'restangular',
        'xeditable'
    ])
    .config(['RestangularProvider',
        function(RestangularProvider) {

            RestangularProvider.setBaseUrl('/api/');
        }
    ]);
