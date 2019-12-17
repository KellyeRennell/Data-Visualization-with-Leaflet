const quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
const platesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

var tectonicplates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.street",
        accessToken: API_KEY
});

const lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
});

const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
});

const map = L.map('map', {
    center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, darkmap, lightmap]
});

streetmap.addTo(map);

var baseMaps = {
    "Street Map" : streetmap,
    "Dark Map" : darkmap,
    "Light Map": lightmap
  };

var overlays = {
    "Earthquakes": earthquakes,
    "Plates" : tectonicplates
};

L.control.layers(baseMaps, overlays, {
    collapsed: false
}).addTo(map);

d3.json(quakeUrl, function(data) {

        function getStyle(feature) {
        return {
            fillColor: getColor(feature.properties.mag),
            color: "black",
            radius: circleSize(feature.properties.mag),
            weight: 1,
            stroke: true,
            opacity: 1,
            fillOpacity: 1,
    };
 }

    function getColor(mag) {
        switch (true) {
            case mag > 5:
            return "#bd0026";
        case mag > 4:
            return "#f03b20";
        case mag > 3:
            return "#fd8d3c";
        case mag > 2:
            return "#fecc5c";
        case mag > 1:
            return "#ffffb2";
        default:
            return "#feedde";
        }
    }

    function circleSize(mag) {
        if (mag === 0) {
            return 1;  
     }
        return mag * 4;
    }

L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
        },
        style: getStyle,

        onEachFeature: function(feature, layer) {
            var popupContent = "<h4>Location: " + feature.properties.place + 
            "</h4><hr><p>Date & Time: " + new Date(feature.properties.time) + 
            "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>";
                
            layer.bindPopup(popupContent);
        }
    }).addTo(earthquakes);

    earthquakes.addTo(map);

    //creating customized legend control   

 var legend = L.control({position: 'bottomright'});
 legend.onAdd = function(map) {
 
     var div = L.DomUtil.create('div', 'info legend'),
         grades = [0, 1, 2, 3, 4, 5],
         labels = [];
 
     // loop through our density intervals and generate a label with a colored label for each magnitude level
     for (var i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }
 
     return div;
 };
 
 legend.addTo(map);

//Tectonic Plates data
d3.json(platesUrl, function(platedata) {
    L.geoJson(platedata, {
        color: "yellow",
        weight: 3
        
    }).addTo(tectonicplates);

    tectonicplates.addTo(map);
    });
});

 



   





   
   




    


    















