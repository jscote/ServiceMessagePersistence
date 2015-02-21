/**
 * Created by jean-sebastiencote on 2/2/15.
 */
(function (_, q, es, serviceMessage) {

    'use strict';

    var internalConfiguration = {connectionConfiguration: {host: 'localhost:9200'}};

    var ConnectionConfiguration = function (config) {
        for (var prop in config) {
            this[prop] = config[prop];
        }
    };

    var configuration = function (config) {

        config = config || {};
        internalConfiguration = config;
        internalConfiguration.connectionConfiguration = config.connectionConfiguration || {host: 'localhost:9200'};

        serviceMessage.configure({
            messageCreatedHandler: handleMessageCreated,
            messageContextCreatedHandler: handleMessageContextCreated,
            messageUpdatedHandler: handleMessageCreated,
            messageContextUpdatedHandler: handleMessageContextCreated
        });
    };

    var handleMessageCreated = function (msg) {
        var client = new es.Client(new ConnectionConfiguration(internalConfiguration.connectionConfiguration));

        var body = msg.toJSON();
        body.messageType = msg instanceof serviceMessage.ServiceMessage ?
            'ServiceMessage' : msg instanceof serviceMessage.ServiceResponse
            ? 'ServiceResponse' : 'Unknown';

        client.index({
            index: 'servicemessages',
            type: 'message',
            id: msg.id,
            body: body
        }).then(function () {
            client.close();
        }).catch(function (error) {
            client.close();
            console.log(error);
        });

    };

    var handleMessageContextCreated = function (msg) {
        var client = new es.Client(new ConnectionConfiguration(internalConfiguration.connectionConfiguration));


        client.index({
            index: 'servicemessages',
            type: 'messageContext',
            id: msg.id,
            body: msg.toJSON()
        }).then(function () {
            client.close();
        }).catch(function (error) {
            client.close();
            console.log(error);
        });
    };


    module.exports.Configuration = configuration;


})(require('lodash'), require('q'), require('elasticsearch'), require('jsai-servicemessage'));