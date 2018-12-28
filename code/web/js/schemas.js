var schemas = {
'announcement': {"$id":"http://schema.ruter.no/announcement.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"expiryTimestamp":{"$id":"#/properties/expiryTimestamp","description":"Expiry timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"message":{"$id":"#/properties/message","additionalProperties":false,"description":"Message for one or more language","patternProperties":{"^[a-z]{2}(-[a-z]{2})?$":{"$id":"#/properties/message/patternProperties/multilingualMessage","properties":{"text":{"$id":"#/properties/message/patternProperties/multilingualMessage/properties/text","description":"Body text","type":"string"},"title":{"$id":"#/properties/message/patternProperties/multilingualMessage/properties/title","description":"Title","type":"string"}},"title":"A multilingual message","type":"object"}},"type":"object"},"ref":{"$id":"#/properties/ref","items":{"$id":"#/properties/ref/items","description":"StopPlaceId, LineId, RouteId, VehicleJourneyId or other references that define scope","examples":["RUT:Line:31","NSR:StopPlace:6468","RUT:Route:31-1041"],"type":"string"},"title":"List of affected scopes","type":"array"}},"required":["eventTimestamp","message"],"title":"Announcement MQTT Message","type":"object"}, 
'apc': {"$id":"http://schema.ruter.no/apc.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{},"description":"Automatic Passaneger Count","properties":{"doorCountQuality":{"$id":"#/properties/doorCountQuality","description":"Door count quality","enum":["ABSENT","REGULAR","DEFECT","OTHER"],"type":"string"},"doorId":{"$id":"#/properties/doorId","description":"Door id","maximum":10,"minimum":1,"type":"integer"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"EventTimestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"passengerCounting":{"$id":"#/properties/passengerCounting","description":"Passenger counts by Object Class","items":{"$id":"#/properties/passengerCounting/items","additionalProperties":false,"properties":{"doorPassengerIn":{"$id":"#/properties/passengerCounting/items/properties/doorPassengerIn","description":"Passenger count in door","type":"integer"},"doorPassengerOut":{"$id":"#/properties/passengerCounting/items/properties/doorPassengerOut","title":"Passenger count out door","type":"integer"},"objectClass":{"$id":"#/properties/passengerCounting/items/properties/objectClass","description":"Class of object counted","enum":["ABSENT","ADULT","CHILD","PRAM","BIKE","WHEELCHAIR","OTHER"],"type":"string"}},"required":["objectClass","doorPassengerIn","doorPassengerOut"],"title":"The Items Schema","type":"object"},"type":"array"}},"required":["eventTimestamp","doorId","passengerCounting","doorCountQuality"],"title":"APC MQTT Message","type":"object"}, 
'arriving': {"$id":"http://schema.ruter.no/arriving.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"For display of arriving information to passengers","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"expiryTimestamp":{"$id":"#/properties/expiryimestamp","description":"Expiry timestamp must be ISO 8601 UTC, do not play or display after","format":"date-time","type":"string"},"message":{"$id":"#/properties/message","additionalProperties":false,"description":"Message for one or more language","patternProperties":{"^[a-z]{2}(-[a-z]{2})?$":{"$id":"#/properties/message/patternProperties/multilingualMessage","additionalProperties":false,"description":"A multilingual message","properties":{"text":{"$id":"#/properties/message/patternProperties/multilingualMessage/properties/text","description":"Body text","type":"string"},"title":{"$id":"#/properties/message/patternProperties/multilingualMessage/properties/title","description":"Title","type":"string"}},"type":"object"}},"type":"object"},"ref":{"$id":"#/properties/ref","description":"Reference to stop place id","type":"string"},"zoneId":{"$id":"#/properties/zoneId","description":"Fare zone of next stop","type":"string"}},"required":["eventTimestamp","message"],"title":"Arriving MQTT Message","type":"object"}, 
'audio': {"$id":"http://schema.ruter.no/audio.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{},"description":"All audio is sent over one topic and message may contain multiple audio segments that must be played in the order listed","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"expiryTimestamp":{"$id":"#/properties/expiryTimestamp","description":"Expiry timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"ref":{"$id":"#/properties/ref","default":"","description":"Reference for announcement","examples":["RUT:StopPlace:03012453"],"type":"string"},"type":{"$id":"#/properties/type","description":"The announcement type","enum":["ARRIVING","DEVIATION","ANNOUNCEMENT"],"type":"string"},"value":{"$id":"#/properties/value","description":"List of audio files to be played in order","items":{"$id":"#/properties/value/items","additionalProperties":false,"description":"Audio","properties":{"content":{"$id":"#/properties/value/properties/content","contentEncoding":"base64","description":"Base64-encoded audio data","type":"string"},"encoding":{"$id":"#/properties/value/items/properties/encoding","description":"Encoding type","enum":["MP3","OPUS"],"type":"string"},"speaker":{"$id":"#/properties/value/properties/speaker","default":"PASSENGERS","description":"Target speaker for audio","enum":["PASSENGERS","DRIVER","EXTERNAL"],"type":"string"},"volume":{"$id":"#/properties/value/properties/volume","default":70,"description":"Volume 1-100","maximum":100,"minimum":1,"type":"integer"}},"required":["encoding","content"],"type":"object"},"type":"array"}},"required":["eventTimestamp","expiryTimestamp","type","value"],"title":"Audio MQTT Message","type":"object"}, 
'avl': {"$id":"http://schema.ruter.no/avl.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{},"description":"Automatic Vehicle Location","properties":{"deadReckoning":{"$id":"#/properties/deadReckoning","description":"Dead reckoning was used to calculate the new position","type":"boolean"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"EventTimestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"gnssCoordinateSystem":{"$id":"#/properties/gnssCoordinateSystem","description":"GNSS coordinate system","enum":["WGS84"],"type":"string"},"gnssType":{"$id":"#/properties/gnssType","description":"GNSS type","enum":["GPS","GLONASS","GALILEO","BEIDOU","IRNSS","OTHER","DEADRECKONING","MIXEDGNSSTYPES"],"type":"string"},"heading":{"$id":"#/properties/heading","description":"Compass heading","maximum":360.0000,"minimum":0.0000,"type":"number"},"horizontalDilutionOfPrecision":{"$id":"#/properties/horizontalDilutionOfPrecision","description":"Value of precision in horizontal dilution","type":"number"},"latitude":{"$id":"#/properties/latitude","description":"Latitude","maximum":90.0000,"minimum":-90.0000,"type":"number"},"longitude":{"$id":"#/properties/longitude","description":"Longitude","maximum":180.0000,"minimum":-180.0000,"type":"number"},"numberOfSatellites":{"$id":"#/properties/numberOfSatellites","description":"Number of satellites","type":"integer"},"positionIsSimulated":{"$id":"#/properties/positionIsSimulated","description":"The position is simulated","type":"boolean"},"seqNumber":{"$id":"#/properties/seqNumber","description":"Sequence number","type":"integer"},"signalQuality":{"$id":"#/properties/signalQuality","description":"Signal quality","enum":["AGPS","DGPS","ESTIMATED","GPS","NOTVALID","UNKNOWN"],"type":"string"},"speedOverGround":{"$id":"#/properties/speedOverGround","description":"Speed over ground","minimum":0,"type":"number"}},"required":["eventTimestamp","seqNumber","latitude","longitude","heading","speedOverGround","signalQuality","numberOfSatellites","gnssType","gnssCoordinateSystem","deadReckoning","positionIsSimulated"],"title":"AVL MQTT Message","type":"object"}, 
'c2': {"$id":"http://schema.ruter.no/c2.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{},"description":"Message sent to bus to control DPI functions","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"payload":{"$id":"#/properties/payload","additionalProperties":false,"description":"Command and arguments","properties":{"args":{"$id":"#/properties/payload/properties/args","description":"Arguments to be passed to command","type":"object"},"command":{"$id":"#/properties/payload/properties/command","description":"Command name","type":"string"}},"required":["command","args"],"type":"object"},"type":{"$id":"#/properties/type","description":"The Type Schema","type":"string"}},"required":["eventTimestamp","type","payload"],"title":"C2 MQTT Message","type":"object"}, 
'deviation': {"$id":"http://schema.ruter.no/deviation.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"For display of deviation information to passengers","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"expiryTimestamp":{"$id":"#/properties/expiryimestamp","description":"Expiry timestamp must be ISO 8601 UTC, do not play or display after","format":"date-time","type":"string"},"message":{"$id":"#/properties/message","additionalProperties":false,"description":"Message for one or more language","patternProperties":{"^[a-z]{2}(-[a-z]{2})?$":{"$id":"#/properties/message/patternProperties/multilingualMessage","properties":{"text":{"$id":"#/properties/message/patternProperties/multilingualMessage/properties/text","description":"Body text","type":"string"},"title":{"$id":"#/properties/message/patternProperties/multilingualMessage/properties/title","description":"Title","type":"string"}},"title":"A multilingual message","type":"object"}},"type":"object"},"ref":{"$id":"#/properties/ref","items":{"$id":"#/properties/ref/items","description":"StopPlaceId, LineId, RouteId, VehicleJourneyId or other references that define scope","examples":["RUT:Line:31","NSR:StopPlace:6468","RUT:Route:31-1041"],"type":"string"},"title":"List of affected scopes","type":"array"}},"required":["eventTimestamp","message"],"title":"Deviation MQTT Message","type":"object"}, 
'diagnostics': {"$id":"http://example.com/root.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{},"properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"EventTimestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"payload":{"$id":"#/properties/payload","description":"Diagnostics payload, a dictionary of key/values","type":"object"},"screenId":{"$id":"#/properties/screenId","examples":["ad71dba8-c881-11e8-a8d5-f2801f1b9fd1"],"pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","title":"Screen id","type":"string"},"type":{"$id":"#/properties/type","description":"Diagnostics type","examples":["INFO","HEARTBEAT","ERROR","STATISTICS","SCREEN"],"type":"string"}},"required":["eventTimestamp","screenId","type"],"title":"The Root Schema","type":"object"}, 
'eta': {"$id":"http://schema.ruter.no/eta.json","$schema":"http://json-schema.org/draft-07/schema#","additionalItems":false,"description":"Estimated time of arrival for future stops on a journey","properties":{"estimatedCalls":{"$id":"#/properties/estimatedCalls","description":"List of ETAs for remaining stops on route","items":{"$id":"#/properties/estimatedCalls/items","additionalProperties":false,"properties":{"eta":{"$id":"#/properties/estimatedCalls/items/properties/eta","description":"EventTimestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"stopPlaceId":{"$id":"#/properties/estimatedCalls/items/properties/stopPlaceId","description":"Stop Place Id","type":"string"},"text":{"$id":"#/properties/estimatedCalls/items/properties/text","description":"Display text for arrival time","type":"string"}},"required":["eta","stopPlaceId","text"],"title":"Estimated call for a future stop","type":"object"},"type":"array"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"}},"required":["eventTimestamp","estimatedCalls"],"title":"ETA MQTT Message","type":"object"}, 
'externaldisplay': {"$id":"http://schema.ruter.no/externaldisplay.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Notification that the external displays should show new destination information","properties":{"alternativeMessage":{"$id":"#/properties/alternativeMessage","description":"Alternative message to be displayed on second line of display","type":"string"},"destination":{"$id":"#/properties/destination","description":"Destination of the bus","type":"string"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"publicCode":{"$id":"#/properties/publicCode","description":"Publically-known number of the line","type":"string"}},"required":["eventTimestamp","publicCode","destination"],"title":"External Display MQTT Message","type":"object"}, 
'journey': {"$id":"http://schema.ruter.no/journey.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"List of stops for current journey in block","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event Timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"route":{"$id":"#/properties/route","additionalProperties":false,"description":"Route information","properties":{"id":{"$id":"#/properties/route/properties/id","description":"Route id","type":"string"},"line":{"$id":"#/properties/route/properties/line","additionalProperties":false,"description":"Line information","properties":{"id":{"$id":"#/properties/route/properties/line/properties/id","description":"Line id","type":"string"},"name":{"$id":"#/properties/route/properties/line/properties/name","description":"Public name of line","type":"string"},"publicCode":{"$id":"#/properties/route/properties/line/properties/publicCode","description":"Public code of line","type":"string"}},"required":["id","name","publicCode"],"type":"object"},"name":{"$id":"#/properties/route/properties/name","description":"Public name of route","type":"string"},"stopPlaces":{"$id":"#/properties/route/properties/stopPlaces","description":"Ordered list of stop places on journey","items":{"$id":"#/properties/route/properties/stopPlaces/items","additionalProperties":false,"description":"Stop place info","properties":{"connections":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections","description":"List of connections","items":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections/connection","additionalProperties":false,"description":"Connection","properties":{"colour":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections/connection/properties/colour","description":"Hex value of display colour","examples":["e60000"],"pattern":"^[0-9a-fA-F]{6}$","type":"string"},"id":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections/connection/properties/id","description":"Line id","type":"string"},"name":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections/connection/properties/name","description":"Public name","type":"string"},"publicCode":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections/connection/properties/publicCode","description":"Public code","type":"string"},"type":{"$id":"#/properties/route/properties/stopPlaces/items/properties/connections/connection/properties/transportType","description":"Transport type","enum":["BUS","TRAM","METRO","TRAIN","BOAT","OTHER"],"title":"TransportType","type":"string"}},"required":["id","name","publicCode","type","colour"],"type":"object"},"type":"array"},"id":{"$id":"#/properties/route/properties/stopPlaces/items/properties/id","description":"Stop place id","type":"string"},"location":{"$id":"#/properties/route/properties/stopPlaces/items/properties/location","additionalProperties":false,"description":"Coordinates of stop place","properties":{"latitude":{"$id":"#/properties/route/properties/stopPlaces/items/properties/location/properties/latitude","description":"Latitude","maximum":90.0000,"minimum":-90.0000,"type":"number"},"longitude":{"$id":"#/properties/route/properties/stopPlaces/items/properties/location/properties/longitude","description":"Longitude","maximum":180.0000,"minimum":-180.0000,"type":"number"}},"required":["latitude","longitude"],"type":"object"},"name":{"$id":"#/properties/route/properties/stopPlaces/items/properties/name","description":"Public name of stop","type":"string"}},"required":["id","name","connections","location"],"type":"object"},"type":"array"}},"required":["id","name","line","stopPlaces"],"type":"object"},"routeChangeTimestamp":{"$id":"#/properties/routeChangeTimestamp","description":"Event Timestamp must be ISO 8601 UTC","format":"date-time","type":"string"}},"required":["eventTimestamp","route"],"title":"Journey MQTT Message","type":"object"}, 
'nextstop': {"$id":"http://schema.ruter.no/nextstop.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Notification that vehicle has a new next stop","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"EventTimestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"stopPlaceId":{"$id":"#/properties/stopPlaceId","description":"Stop place id","type":"string"}},"required":["eventTimestamp","stopPlaceId"],"title":"Next Stop MQTT Message","type":"object"}, 
'notification': {"$id":"http://schema.ruter.no/notification.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Message to driver","properties":{"content":{"$id":"#/properties/content","description":"Content of message","type":"string"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"EventTimestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"subject":{"$id":"#/properties/subject","title":"Subject of message","type":"string"},"urgency":{"$id":"#/properties/urgency","description":"Urgency of the message","enum":["HIGH","MEDIUM","LOW"],"type":"string"}},"required":["eventTimestamp","urgency","subject","content"],"title":"Notification MQTT Message","type":"object"}, 
'signoff': {"$id":"http://schema.ruter.no/signon.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Notification to PTA BO that a block is being started or resumed, or completed","properties":{"blockId":{"$id":"#/properties/blockId","description":"Block Id","type":"string"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"vehicleJourneyId":{"$id":"#/properties/vehicleJourneyId","description":"Vehicle Journey Id","type":"string"},"vehicleNumber":{"$id":"#/properties/vehicleNumber","description":"Bus id","type":"string"}},"required":["eventTimestamp","vehicleNumber","blockId","vehicleJourneyId"],"title":"Signon and Signoff MQTT Message","type":"object"}, 
'signon': {"$id":"http://schema.ruter.no/signon.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Notification to PTA BO that a block is being started or resumed, or completed","properties":{"blockId":{"$id":"#/properties/blockId","description":"Block Id","type":"string"},"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"vehicleJourneyId":{"$id":"#/properties/vehicleJourneyId","description":"Vehicle Journey Id","type":"string"},"vehicleNumber":{"$id":"#/properties/vehicleNumber","description":"Bus id","type":"string"}},"required":["eventTimestamp","vehicleNumber","blockId","vehicleJourneyId"],"title":"Signon and Signoff MQTT Message","type":"object"}, 
'stopsignal': {"$id":"http://schema.ruter.no/stopsignal.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"definitions":{},"description":"Notification that passengers have requested a stop","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"stopSignalled":{"$id":"#/properties/stopSignalled","description":"Whether or not the stop signal is active","type":"boolean"}},"required":["eventTimestamp","stopSignalled"],"title":"Stop signalled MQTT Message","type":"object"}, 
'telemetry': {"$id":"http://schema.ruter.no/fmstoip.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Translation of FMS data to MQTT messages","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"id":{"$id":"#/properties/id","Description":"Id of reported value (PGN in FMS standard)","examples":["0000FE4E","0000FDA5","0000FEC1"],"pattern":"^[0-9A-F]{8}$","type":"string"},"payloads":{"$id":"#/properties/payloads","description":"Array of data (one or more SPNs in FMS standard)","items":{"$id":"#/properties/payloads/items","additionalItems":false,"description":"Data for a single Suspect Parameter Number (SPN)","properties":{"name":{"$id":"#/properties/payloads/items/properties/name","description":"Optional name for value","type":"string"},"subid":{"$id":"#/properties/payloads/items/properties/subid","title":"Optional sub id. Typically for Suspect Parameter Number (SPN)","type":"integer"},"unit":{"$id":"#/properties/payloads/items/properties/unit","description":"Optional units for value","type":"string"},"value":{"$id":"#/properties/payloads/items/properties/value","description":"The value of the telemetry","type":["string","number","boolean"]}},"required":["value"],"type":"object"},"type":"array"}},"required":["eventTimestamp","id","payloads"],"title":"FMS-to-IP data","type":"object"}, 
'tsp': {"$id":"http://schema.ruter.no/tsp.json","$schema":"http://json-schema.org/draft-07/schema#","additionalProperties":false,"description":"Notification that vehicle should transmit a traffic preemption message","properties":{"eventTimestamp":{"$id":"#/properties/eventTimestamp","description":"Event timestamp must be ISO 8601 UTC","format":"date-time","type":"string"},"message":{"$id":"#/properties/message","description":"Encoded message for transmission on VHF (VDV telegram)","type":"string"}},"required":["eventTimestamp","message"],"title":"Traffic Preemption MQTT Message","type":"object"}, 
};
