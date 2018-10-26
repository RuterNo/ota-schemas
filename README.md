# OTA JSON Schemas

The schemas provided in this repository define:

* Over the air messages exchanged between Ruter and operators
* Manifest formats for content published on Ruter's CDN

The schemas are accordingly organized into the directories schemas/ota and schemas/cdn.

Documentation is provided in docs/ota for the over the air messages. This is a static version of an internal wiki page.

Examples are provided in examples/cdn and examples/ota.

Sample code is provided in the code directory in two forms:

* a standalone HTML page that listens to mqtt-broker (you must define in your hosts file what this points to) and validates all messages whose local topics it matches.
* a golang command line utility that will validate the examples in this repo or listen to mqtt-broker and validate on the fly, similarly to the HTML page.

