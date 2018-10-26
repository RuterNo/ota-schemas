'use strict';

var connectionStatus = "Disconnected";
var statsModel = {
    "localTopic": "Other",
    "count": 0,
    "lateCount": 0,
    "frequency": 0.0,
    "validCount": 0,
    "invalidCount": 0,
    "cumulativeLatency": 0.0,
    "avgLatency": 0.0,
    "maxLatency": 0.0
}
var stats = {};
var validators = {};
var unknownTopics = {};
var validationErrors = new Map();
var startTime = 0;
var ajv = new Ajv({
    'allErrors': true
});

var initPage = function() {
    startTime = performance.now();
    //initQRCode();
    initializeVariables();
    initValidators();
    initTopicsTable();
    initErrorsTable();
    var client = createMqttConnection();
};

var initQRCode = function() {
    var screenId = uuidv4();
    if (localStorage.getItem("screenId") != null) {
        screenId = localStorage.getItem("screenId");
    } else {
        localStorage.setItem("screenId", screenId);
    }

    var qrcode = new QRCode(document.getElementById("qrcode"),{
        text: 'ruter-spi-screenid:' + screenId,
        width: 100,
        height: 100,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

    console.log(qrcode);
}

var initTopicsTable = function() {
    for( var topic of topics) {
        var localTopic = topic['localTopic'];
        var clone = Object.assign({}, statsModel);
        clone['localTopic'] = localTopic
        stats[localTopic] = clone
    }
    // "wildcard" topic for all other unknown topics
    var clone = Object.assign({}, statsModel);
   stats["*"] = clone
    loadTopicsTable();
   $('.fixed-table-loading').hide();
}

var initErrorsTable = function() {
    $('#validationErrors').bootstrapTable({
        data: {}
    });
    $('.fixed-table-loading').hide();
}

var initValidators = function() {
    for( var topic of topics) {
        if ("schema" in topic && topic['schema'] != null) {
            var localTopic = topic['localTopic'];
            try {
                var validator = ajv.compile(topic['schema']);
                validators[localTopic] = validator
            } catch (e) {
                console.error(e);
            }
        }
    }
}

var initializeVariables = function () {
    localStorage.setItem("host", localStorage.getItem("host") ? localStorage.getItem("host") : 'mqtt-bridge');
    localStorage.setItem("port", localStorage.getItem("port") ? localStorage.getItem("port") : 8993);
    localStorage.setItem("username", localStorage.getItem("username") ? localStorage.getItem("username") : "");
    localStorage.setItem("password", localStorage.getItem("password") ? localStorage.getItem("password") : "");
    localStorage.setItem("useSSL", localStorage.getItem("useSSL") ? localStorage.getItem("useSSL") : false);

    $('#username').val(localStorage.getItem("username"));
    $('#password').val(localStorage.getItem("password"));
    $('#port').val(localStorage.getItem("port"));
    $('#useSSL').prop('checked', JSON.parse(localStorage.getItem('useSSL')));
    $('#host').val(localStorage.getItem("host"));
};

var disconnect = function (client) {
    client.disconnect();
};

var connect = function (client) {
    client.connect(
        {
            onSuccess: onConnect.bind(client),
            hosts: [localStorage.getItem('host')],
            ports: [Number(localStorage.getItem('port'))],
            // reconnect: true,
            userName: localStorage.getItem('username'),
            password: localStorage.getItem('password'),
            useSSL: JSON.parse(localStorage.getItem('useSSL'))
        }
    );
};

var createMqttConnection = function () {

    var client = new Paho.MQTT.Client(
        localStorage.getItem("host"),
        Number(localStorage.getItem("port")),
        getClientId()
    );
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    connect(client);

    function onConnectionLost(responseObject) {
        connectionStatus = "Disconnected from mqtt-broker";
        $('#connectionStatus').toggleClass('badge-success badge-danger').text(connectionStatus);
        console.info("Connection status: " + connectionStatus);
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    function onMessageArrived(message) {
        console.log("topic:" + message.destinationName);
        handleMessageStats(message);
    }
    return client;
};

var handleMessageStats = function (message) {
    var localTopic = message.destinationName;
    var topic = null;
    if (localTopic in stats) {
        topic = stats[localTopic]
    } else {
        topic = stats["*"];
        if(localTopic in unknownTopics) {
            unknownTopics[localTopic]['count']++;
        } else {
            unknownTopics[localTopic] = {
                "localTopic": localTopic,
                "count": 1
            }
        }
    }

    topic['count']++;

    try {
        var payload = JSON.parse(message.payloadString)
    } catch (e) {
        console.error(e);
    }

    // stats
    calculateTimingStats(message.destinationName, payload);
    if("expiryTimestamp" in payload) {
        calculateTimingStats(message.destinationName, payload)
    }

    // validate
    validatePayload(message.destinationName, payload);

    // update table
    var values = Object.keys(stats).map(function(key){
        return stats[key];
    });
    $('#topics').bootstrapTable('load',{
        data: values
    });
}

// based on eventTimestamp
var calculateTimingStats = function(topic, payload) {

}

// based on expiryTimestamp
var calculateExpiryStats = function(topic, payload) {

}

var validatePayload = function(topic, payload) {
    if(topic in validators) {
        try {
            var dirty = false;
            var topicStats = stats[topic]
            var validate = validators[topic]
            var valid = validate(payload)
            if (valid) {
                topicStats["validCount"]++;
            } else {
                topicStats["invalidCount"]++;
                if(!(topic in validationErrors)) {
                    validationErrors[topic] = []
                }
                for(var err of validate.errors) {
                    var text = err.keyword + ": " + err.message;
                    if(err.keyword == "additionalProperties") {
                        if (err.params.additionalProperty != null)
                        text += " (" + err.params.additionalProperty + ")";
                    } else {
                        text += " (" + err.schemaPath + ")";
                    }
                    console.warn(text);
                    if(!validationErrors[topic].includes(text)) {
                        validationErrors[topic].push(text)
                        dirty = true;
                    }
                }
                if(dirty) {
                    updateErrorsTable();
                }
            }
        } catch(e) {
            console.error(e);
        }
    }
}

var loadTopicsTable = function() {
    var values = Object.keys(stats).map(function(key){
        return stats[key];
    });
    $('#topics').bootstrapTable({
        data: values
    });
}

var updateTopicsTable = function() {
    var values = Object.keys(stats).map(function(key){
        return stats[key];
    });
    $('#topics').bootstrapTable({
        data: values
    });
}

var updateErrorsTable = function() {
    var values = [];
    var keys = Object.keys(validationErrors).sort();
    for (var topic of keys) {
        values.push({'type': 't', 'text': topic})
        for (var err of validationErrors[topic]) {
            values.push({'type': 'e', 'text': err})
        }
    }
    var el = $('#validationErrors');
    el.bootstrapTable('load', {
        data: values
    });
}

var topicsTableRowStyle = function(row, index) {
    return {'css': {'padding': '3px'}};
}

var errorTableRowStyle = function(row, index) {
    if(row['type'] == "t") {
        return { 'classes': 'bg-secondary text-white', 'css': {'padding': '3px'}}
    }
    return {'css': {'padding': '3px'}};
}

var topicsCellFormatter = function (value, row, index, field) {
    if (field === 'invalidCount' && Number(value) > 0) {
        return '<span class="badge badge-danger">' + value + '</span>';
    }
    return value;
}

var onConnect = function() {
    connectionStatus = "Connected to mqtt-broker";
    $('#connectionStatus').toggleClass('badge-warning badge-success').text(connectionStatus);

    console.log("Connection status: " + connectionStatus);
    this.subscribe("#"); // subscribing on wildcard channel, to see the sent content in the browser console.
};

var getClientId = function() {
    return "ruter.dpi.mqtt-diagnostics." + uuidv4()
}

var uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
};


$('document').ready(function(){
    initPage();
});