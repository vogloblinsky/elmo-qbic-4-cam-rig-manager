'use strict';

var request         = require('request').defaults({
        encoding: null
    }),
    fs              = require('fs-extended'),
    
    qbicProxy       = require('./utils/qbic-proxy.js'),
    constants       = require('./utils/constants.js');

module.exports = function(app) {

    app.route('/api/life')
        .get(function(req, res, next) {
            res.send(true);
        });

    app.route('/api/camera/:id/connect')
        .get(qbicProxy.connectToCamera);

    app.route('/api/camera/settings')
        .get(qbicProxy.getCameraSettings);

    app.route('/api/camera/thumb')
        .get(qbicProxy.getCameraThumb);
};
