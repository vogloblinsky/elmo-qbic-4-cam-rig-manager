'use strict';

angular.module('camManager').factory('LifeService', ['Restangular',
    function(Restangular) {

        return {
            get: function() {
                return Restangular.one('life').get();
            }
        };
    }
]);