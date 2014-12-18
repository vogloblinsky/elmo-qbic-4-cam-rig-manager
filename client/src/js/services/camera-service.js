'use strict';

angular.module('camManager').service('CameraService', ['Restangular',
    function(Restangular) {

        var baseCamera = Restangular.all('camera');

        this.getThumb = function() {
            return baseCamera.customGET('thumb');
        };

        this.getSettings = function() {
            return baseCamera.customGET('settings');
        };
    }
]);