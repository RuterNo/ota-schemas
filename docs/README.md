# Ruter OTA Message Schemas

This site and the associated repo documents the formats of the over-the-air (OTA) messages that are exchanged between the PTA BO and public transport running ITxPT.

There is [a page describing the messages in detail](https://ruterno.github.io/ota-schemas/mqtt/index.html).

Example code can be found in [code/web](https://github.com/RuterNo/ota-schemas/tree/master/code/web). The standalone page monitors mqtt-broker (which must be define in your hosts file) and validates all incoming messages against the embedded schemas. The Javascript library used is AJV.

Other programming languages support validation of JSON messages against schemas. See [the Implementations page on the JSON Schema site](https://json-schema.org/implementations.html).