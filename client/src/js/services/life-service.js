'use strict';

angular.module('camManager').service('LifeService', ['Restangular',
    function(Restangular) {

        this.get = function() {
            return Restangular.one('life').get();
        };
    }
]);
