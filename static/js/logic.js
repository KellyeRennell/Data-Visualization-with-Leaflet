// Store our API endpoint inside queryUrl
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// const platesUrl = 

// /? Perform a GET request to the query URL
// d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
//     createFeatures(data.features);
//     console.log(data.features)
// });


function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    var earthquakes = L.geoJSON(earthquakeData, {

        style: function(feature) {
            var fillColor,
                magnitude = feature.properties.mag;
            if (magnitude > 1) fillColor = "#006837";
            else if (magnitude > 2) fillColor = "#31a354";
            else if (magnitude > 3) fillColor = "#78c679";
            else if (magnitude > 4) fillColor = "#c2e699";
            else if (magnitude > 5) fillColor = "#ffffcc";
            else fillColor = "#f7f7f7"; // no data
            return {
                color: "#000",
                weight: 1,
                fillColor: fillColor,
                fillOpacity: .6,
                radius: feature.properties.mag * 4
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3 align='center'>" + feature.properties.place +
                "</h3><hr><p><u>Occurrence:</u> " + new Date(feature.properties.time) + "</p>" +
                "</h3><p><u>Magnitude:</u> " + feature.properties.mag + "</p>");
        }
    }).addTo(map);
}
createMap(earthquakes);

function createMap(earthquakes) {

    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.street",
        accessToken: API_KEY
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    var baseMaps = {
        "StreetMap": streetmap,
        "Map": lightmap
    };

    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    var map = L.map('map', {
        center: [37.09, -95.71],
            zoom: 5,
            layers: [streetmap, earthquakes]
    });
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        })
        .addTo(map);

        var legend = L.control({
            position: 'bottomright'
        });

        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 1, 2, 3, 4],
                labels = [];

            div.innerHTML += 'Magnitude<br><hr>'

            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

            return div;
        }
    }