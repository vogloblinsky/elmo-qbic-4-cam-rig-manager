'use strict';

module.exports = function(app) {
    
    app.route('/api/life')
        .get(function(req, res, next) {
            res.send(true);
        });

};
