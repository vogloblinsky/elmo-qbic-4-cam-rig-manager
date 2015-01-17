'use strict';

var Q = require('q'),
    exec = require('child_process').exec,
    commands = {
        currentNetwork: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -I',
        connect: 'networksetup -setairportnetwork en1 "NETWORK_TOKEN" "PASSWORD_TOKEN"'
    }

var extractCurrentNetwork = function(output) {
    var _result = '',
        deferred = Q.defer();
    _result = output.split('\n').reduce(function(obj, pair) {
        var match = pair.match(/^\s+([^:]+):\s+(.*)(\b\s+)?$/);
        if (match) obj[match[1]] = isNaN(match[2]) ? match[2] : parseInt(match[2]);
        return obj;
    }, {});
    deferred.resolve(_result);
    return deferred.promise;
};

var execute = function(cmd) {
    var deferred = Q.defer();
    exec(cmd, function(err, strout, strerr) {
        if (err) deferred.reject(new Error(err));
        else if (strerr) deferred.reject(new Error(strerr));
        else deferred.resolve(strout);
    });
    return deferred.promise;
};

var getCurrentWifiNetwork = function() {
    var deferred = Q.defer();
    execute(commands.currentNetwork).then(extractCurrentNetwork).then(function(name) {
        console.log('name: ', name.SSID);
        deferred.resolve(name.SSID);
    }, function() {
        deferred.reject();
    });
    return deferred.promise;
};

var connectToNetwork = function(networkName, networkPassword) {
    var deferred = Q.defer();
    execute(commands.connect.replace('NETWORK_TOKEN', networkName).replace('PASSWORD_TOKEN', networkPassword)).then(function() {
        deferred.resolve();
    }, function() {
        deferred.reject();
    });
    return deferred.promise;
}

module.exports = {
    getCurrentWifiNetwork: getCurrentWifiNetwork,
    connectToNetwork: connectToNetwork
};
