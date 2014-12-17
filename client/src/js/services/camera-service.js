'use strict';

angular.module('camManager').service('CameraService', ['Restangular',
    function(Restangular) {

        var baseCamera = Restangular.all('camera');

        this.getThumb = function(id) {
            return Restangular.one('camera', id).customGET('thumb');
        };
    }
]);