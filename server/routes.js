'use strict';

var request = require('request').defaults({ encoding: null }),
    fs = require('fs-extended');

module.exports = function(app) {

    app.route('/api/life')
        .get(function(req, res, next) {
            res.send(true);
        });

    app.route('/api/camera/:id/thumb')
        .get(function(req, res, next) {
            var _cameraId = req.params.id,
                _fileName = '/tmp/cam-thumb' + _cameraId + '.jpg',
                _contentType = null,
                _finalURI = null;

            request('http://192.168.42.1/mjpeg/amba.jpg', function (error, response, body) {
                _contentType = response.headers['content-type'];
                _finalURI = 'data:' + _contentType + ';base64,' + new Buffer(body).toString('base64');
                res.send(_finalURI);
            });
           
        });

};
