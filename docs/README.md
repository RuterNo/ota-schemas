# Ruter OTA Message Schemas

This repository documents the [formats of the over-the-air (OTA) messages](https://github.com/RuterNo/ota-schemas/tree/master/schemas/mqtt) that are exchanged between the PTA BO and public transport running ITxPT with JSON schemas. We are currently using [version 0.7 of the JSON Schema](https://json-schema.org/specification.html) standard, which is still under development.

There is also [a page describing the messages in detail](https://ruterno.github.io/ota-schemas/mqtt/index.html).

In addition, under [schemas/cdn](https://github.com/RuterNo/ota-schemas/tree/master/schemas/cdn), there are schemas for the manifests that define packages and mqtt topics.

Example code using Javascript can be found in [code/web](https://github.com/RuterNo/ota-schemas/tree/master/code/web). The standalone page monitors mqtt-broker (which must be define in your hosts file) and validates all incoming messages against the embedded schemas and displays statistics. The Javascript library used is AJV.

Other programming languages support validation of JSON messages against schemas. See [the Implementations page on the JSON Schema site](https://json-schema.org/implementations.html).

## Document List

* [OTA Messages](https://ruterno.github.io/ota-schemas/mqtt/index.html)
* [MQTT Topic Updates](https://ruterno.github.io/ota-schemas/mqtt-updates/index.html)

## Repository Structure

* code
  * web - sample web application
* docs - the source for the GitHub pages you are reading now
* examples
  * cdn - example files that define topics and DPI packages (this is not the authorative source for this information)
  * mqtt - examples of the content of each topic
* schemas
  * cdn - schemas for the files that define topics and DPI packages
  * mqtt - schemas for the content of each topic
  
