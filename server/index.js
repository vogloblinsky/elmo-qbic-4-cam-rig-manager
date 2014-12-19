var express         = require('express'),
    path            = require('path'),
    logger          = require('morgan'),
    app             = express(),
    urlClient       = '../client/src';

/**
 * Configuration
 */

app.set('port', process.env.PORT || 9090);

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, urlClient)));

require('./routes.js')(app);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port') + ' in ' + process.env.NODE_ENV + ' mode');
});