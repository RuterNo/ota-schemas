# Errata

17 December, 2018

The version of the OTA documentation has been updated to 2.0.1 and reflects corrections to mistakes and omissions 
in the docuemantation and schemas.

In version 2.0.1 we also specify that <vehicleid> shall be understood to be the vehicle's VIN and <sender>/<recipient> are the id for PTO assigned by PTA.

  Category   | Topic    | Description
------------ | -------- | ------------
added field | avl/json	| added optional horizontalDilutionOfPrecision to align with ITxPT
changed field	| avl/json	| changed enum values of gnssCoordinateSystem to only allow WGS84. No other coordinate systems are allowed.
changed field	| avl/json | changed enum values of signalQuality to remove redundant suffix "_QUALITY" and align with ITxPT
changed field	| avl/json	| changed enum values of gnssType to align with naming in ITxPT
documentation	| stopsignal/json	| state explicitly that stop signal messages should also be sent when the signal is turned off.
documentation	| telemetry/json	| some extraneous detail about FMS-to-IP has been removed.
|documentation | vehicle id	| defined vehicle id as VIN
documentation	| sender and recipient	| defined sender and recipient as PTO id assigned by PTA
documentation	| tsp/json	| added example of encoded value
documentation	| infohub/dpi/externaldisplay/json	| make clear that alternativeText will be used and is intended for the second line of the display. Example was updated.
schema correction	| infohub/dpi/journey/json	| routeChangeTimestamp is not required
schema correction	| infohub/dpi/audio/json	| enum for encoding type should contain only MP3 and OPUS
schema correction	| infohub/dpi/arriving/json	| add "addtionalProperties: false: to correctly support multi-lingual messages
