# Ruter OTA Message Schemas

This repository documents the [formats of the over-the-air (OTA) messages](https://github.com/RuterNo/ota-schemas/tree/master/schemas/mqtt) that are exchanged between the PTA BO and public transport running ITxPT with JSON schemas. There is also [a page describing the messages in detail](https://ruterno.github.io/ota-schemas/mqtt/index.html).

In addition, under [schemas/cdn](https://github.com/RuterNo/ota-schemas/tree/master/schemas/cdn), there are schemas for the manifests that define packages and mqtt topics.

Example code using Javascript can be found in [code/web](https://github.com/RuterNo/ota-schemas/tree/master/code/web). The standalone page monitors mqtt-broker (which must be define in your hosts file) and validates all incoming messages against the embedded schemas and displays statistics. The Javascript library used is AJV.

Other programming languages support validation of JSON messages against schemas. See [the Implementations page on the JSON Schema site](https://json-schema.org/implementations.html).