

 /*Import & Visualize the Data**

 Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

 * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

 * Include popups that provide additional information about the earthquake when a marker is clicked.

 * Create a legend that will provide context for your map data.

 * Your visualization should look something like the map above.*/
 
// Store our API endpoint inside usgsUrl for USGS earthquake data for all earth quakes in the past 7 days

const usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
    console.log(usgsUrl)

 // Once we get a response, send the data.features object to the createFeatures function
 d3.json(usgsUrl).then( data => {
    console.log(data);
})

 
function createFeatures(earthquakeData) {

     // Define a function we want to run once for each feature in the features array
     // Give each feature a popup describing the place and time of the earthquake
 
 function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "<br> Magnitude: " +feature.properties.mag +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}
//associate color relative to the earthquake magnitude
 function chooseColor(magnitude) {

    if (magnitude < 1){
        return "black"
    }

    else if (magnitude < 2){
        return "yelloe"
    }

    else if (magnitude < 3){
        return "green"
    }

    else if (magnitude < 4){
        return "orange"
    }

    else if(magnitude < 5) {
        return "red"
    }
    else {
    return "blue"
  }
}


// Creating a GeoJSON layer with the retrieved data
  const earthquakes = L.geoJson(earthquakeData, {
      onEachFeature: onEachFeature,     
        pointToLayer: function (feature, latlng) {
        var geojsonMarkerOptions = {
        radius: 5*feature.properties.mag,
        fillColor: chooseColor(feature.properties.mag),
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
        };

        return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    });
       
    createMap(earthquakes)


function createMap(earthquakes) {

        // Define streetmap and lightmap layers
    const streetMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                maxZoom: 18,
                id: "mapbox.streets",
                accessToken: API_KEY
        });
    
    var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                maxZoom: 18,
                id: "mapbox.light",
                accessToken: API_KEY
        });

        // Define a baseMaps object to hold our base layers
    const baseMaps = {
        "Street Map": streetmap,
        "Light Map": lightMap
};

// Create overlay object to hold our overlay layer
const overlayMaps = {
        Earthquakes: earthquakes
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetmap, earthquakes]
});

 // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
}).addTo(myMap);

//Adding a legend to the map

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

var div = L.DomUtil.create('div', 'info legend'),
    magnitude = [0,1,2,3,4,5],
    labels = [];

for (var i = 0; i < magnitude.length; i++) {
    div.innerHTML +=
        '<i style="background:' + chooseColor(magnitude[i] + 1) + '"></i> ' +
        magnitude[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
 }

 return div;
 };

 legend.addTo(map);

}



    




}
