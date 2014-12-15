var Wifitools       = require('./utils/wifi-tool'),
    wifiClient      = new Wifitools(),
    connectedWifi   = null,
    localCamIP      = '192.168.42.1',
    express         = require('express'),
    path            = require('path'),
    app             = express(),
    urlClient       = '../client/src';

wifiClient.getCurrentWifiNetwork();

/*
setTimeout(function() {
    wifiClient.connectToNetwork('QBIC-VOG-1', '0123456789').then(function() {
        setTimeout(function() {
            //Test correct connection after 5s
            connectedWifi = wifiClient.getCurrentWifiNetwork();
            console.log('connectedWifi: ', connectedWifi);
        }, 5000);
    });
}, 2000);
*/

/**
 * Configuration
 */

app.set('port', process.env.PORT || 9090);

app.use(express.static(path.join(__dirname, urlClient)));

require('./routes.js')(app);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port') + ' in ' + process.env.NODE_ENV + ' mode');
});