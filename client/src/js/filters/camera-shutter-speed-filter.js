'use strict';

angular.module('camManager.filters').filter('shutterSpeed', function() {
    return function(input) {
        var _result = '';
        switch (input) {
            case 1:
                _result = '1/8000';
                break;
            case 2:
                _result = '1/4000';
                break;
            case 3:
                _result = '1/3000';
                break;
            case 4:
                _result = '1/2000';
                break;
            case 5:
                _result = '1/1500';
                break;
            case 6:
                _result = '1/1000';
                break;
            case 7:
                _result = '1/725';
                break;
            case 8:
                _result = '1/500';
                break;
            case 9:
                _result = '1/350';
                break;
            case 10:
                _result = '1/250';
                break;
            case 11:
                _result = '1/180';
                break;
            case 12:
                _result = '1/125';
                break;
            case 13:
                _result = '1/100';
                break;
            case 14:
                _result = '1/90';
                break;
            case 15:
                _result = '1/60';
                break;
            case 16:
                _result = '1/30';
                break;
            default:
                break;
        }
        return _result;
    };
});
