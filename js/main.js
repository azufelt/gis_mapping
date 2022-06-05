 // get library dependencies
 require([
     "esri/config",
     "esri/Map",
     "esri/views/MapView",

     "esri/layers/FeatureLayer"
   ],

   // config api key
   function (esriConfig, Map, MapView, FeatureLayer) {
     // API Key 
     const API_KEY = 'AAPKefc7b532366f4862977e004bab69f930AF9YENkZ2sHg74ETs5M6lGqX7ekD0XOCzax-SWkvQZ_ZyHiK-_uNaE0ABYL4JQ3C';
     esriConfig.apiKey = API_KEY;

     // Basemap layer -topographic map-
     const map = new Map({
       basemap: "arcgis-topographic"
     });

     //  Center user initial view
     const view = new MapView({
       container: "viewDiv",
       map: map,
       center: [-118.80543, 34.02700], //Longitude, latitude
       zoom: 13
     });

     // Define a pop-up for object
     const popupTrailheads = {
       "title": "Trailhead",
       "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
     }

     // fetch list of trailheads and parse to json
     const trailheads = new FeatureLayer({
       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
       outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
       popupTemplate: popupTrailheads
     });
     // Add object to map display
     map.add(trailheads);

     // Initialize a popup for Trails
     const popupTrails = {
       title: "Trail Information",
       content: [{
         type: "media",
         mediaInfos: [{
           type: "column-chart",
           caption: "",
           value: {
             fields: ["ELEV_MIN", "ELEV_MAX"],
             normalizeField: null,
             tooltipField: "Min and max elevation values"
           }
         }]
       }]
     }

     // fetch list of trails
     const trails = new FeatureLayer({
       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
       outFields: ["TRL_NAME", "ELEV_GAIN"],
       popupTemplate: popupTrails
     });

     map.add(trails, 0);

     // Define popup for Parks
     const popupOpenspaces = {
       "title": "{PARK_NAME}",
       "content": [{
         "type": "fields",
         "fieldInfos": [{
             "fieldName": "AGNCY_NAME",
             "label": "Agency",
             "isEditable": true,
             "tooltip": "",
             "visible": true,
             "format": null,
             "stringFieldOption": "text-box"
           },
           {
             "fieldName": "TYPE",
             "label": "Type",
             "isEditable": true,
             "tooltip": "",
             "visible": true,
             "format": null,
             "stringFieldOption": "text-box"
           },
           {
             "fieldName": "ACCESS_TYP",
             "label": "Access",
             "isEditable": true,
             "tooltip": "",
             "visible": true,
             "format": null,
             "stringFieldOption": "text-box"
           },

           {
             "fieldName": "GIS_ACRES",
             "label": "Acres",
             "isEditable": true,
             "tooltip": "",
             "visible": true,
             "format": {
               "places": 2,
               "digitSeparator": true
             },

             "stringFieldOption": "text-box"
           }
         ]
       }]
     }

     // Add feature layer to show overview of Park
     const openspaces = new FeatureLayer({
       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
       outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES", "TRLS_MI", "TOTAL_GOOD", "TOTAL_FAIR", "TOTAL_POOR"],
       popupTemplate: popupOpenspaces
     });

     map.add(openspaces, 0);

   });