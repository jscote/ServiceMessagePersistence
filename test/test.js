/**
 * Created by jean-sebastiencote on 2/9/15.
 */
var base = require('../index.js');
var serviceMessage = require('jsai-servicemessage');

module.exports = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    handleMessageCreated_worksWhenServiceMessageIsCreated: function (test) {
        base.Configuration();
        var msg = new serviceMessage.ServiceMessage();
        test.done();
    },
    handleMessageUpdated_worksWhenServiceMessageIsCreatedThenUpdated: function (test) {
        base.Configuration();
        var msg = new serviceMessage.ServiceMessage();
        msg.data = {test: 'test'};
        msg.update();
        test.done();
    },
    handleResponseCreated_WhenCreatedFromMessage: function(test) {
        base.Configuration();

        var msg = new serviceMessage.ServiceMessage();
        var response = msg.createServiceResponseFrom();
        response.data = {test: 'testResponse'};
        response.update();

        test.done();
    }
};