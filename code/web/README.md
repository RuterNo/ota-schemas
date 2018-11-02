# Sample Web Application for OTA Schemas

This sample project is a standalone HTML application that contains all its resources locally. 
Simply point to the index.html file to run.

It tries to connect to an MQTT broker with the hard-coded name mqtt-broker, which is expected on board busses.

It monitors all topics on the broker and for topics that are known and have schemas, it will validate 
the content of the messages and record statistics.

The javascript code run in the application depends on the following Javascript libraries:

* **Paho MQTT Client** over websockets ([mqttws32](https://www.eclipse.org/paho/clients/js/)/[GitHub](https://github.com/eclipse/paho.mqtt.javascript)/
[NPM](https://www.npmjs.com/package/paho-mqtt)). 
* **Another JSON Schema Validator** ([ajv](https://ajv.js.org/)/[GitHub](https://github.com/epoberezkin/ajv)/[NPM](https://www.npmjs.com/package/ajv)).
* **JQuery** as a JavaScript framework
* **BootStrap** for UI
