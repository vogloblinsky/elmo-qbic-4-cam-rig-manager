define([
    'intern!object',
    'intern/chai!',
    'intern/dojo/node!chai-as-promised',
    'intern/chai!assert',
    'intern/dojo/node!../../server/utils/wifi-tool'
], function(registerSuite, chai, chaiAsPromised, assert, wifiTool) {
    chai.use(chaiAsPromised);

    registerSuite({
        name: 'wifiTool',

        greet: function() {
            assert.eventually.strictEqual(wifiTool.extractCurrentNetwork('SSID: QBIC-VOG-1'),
                'QBIC-VOG-1',
                'wifiTool.extractCurrentNetwork should return the current network SSID');
        }
    });
});
