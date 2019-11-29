<<<<<<< HEAD
 /*Import & Visualize the Data**

 Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

 * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

 * Include popups that provide additional information about the earthquake when a marker is clicked.

 * Create a legend that will provide context for your map data.

 * Your visualization should look something like the map above.*/

 // Store our API endpoint inside usgsUrl for USGS earthquake data for all earth quakes in the past 7 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
 // console.log(url)

 d3.json(url, function(data) {
     createFeatures(data.features);
 });

// Once we get a response, send the data.features object to the createFeatures function

function createFeatures(data) {
    var myMap = L.map ("map", {
        center: [36.63, -121.19],
        zoom: 5
    });

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    }).addTo(myMap);

    //creating our markers
    data.forEach(feature => {
        let mag = feature.properties.mag;

        var color = "";
        
        if (mag <= 1) {
            color = "blue";
        }
        else if (mag <= 2) {
            color = "orange";
        }
        else if (mag <= 3) {
            color = "green";
        }
        else if (mag <=4) {
            color = "yellow";
        }
        else if (mag <= 5) {
            color = "black";
        }
        else {
            color + "red";
        }

        L.circle([feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]], {
                fillColor: color,
                fillOpacity: 0.5,
                color: color,
                radius: mag * 12000

            }).bindPopup("<h4> Location: " + feature.properties.place + "<hr> Mag: " + mag + "</h4>"). addTo(myMap);

    });


//Adding a legend to my map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend');

            var grades = [0,1,2,3,4,5];
            var labels = ["black", "blue", "green", "yellow", "orange", "red"];

//Loop through density intervals and generate the label with colored background for each interval
         for (var i = 0; i < grades.length; i++) {

            div.innerHTML +=
            "<i style='background: " + labels[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
             
    return div;
};

legend.addTo(myMap);

}


=======
 /*Import & Visualize the Data**

 Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

 * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

 * Include popups that provide additional information about the earthquake when a marker is clicked.

 * Create a legend that will provide context for your map data.

 * Your visualization should look something like the map above.*/

 // Store our API endpoint inside usgsUrl for USGS earthquake data for all earth quakes in the past 7 days
const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
 // console.log(url)

 d3.json(url, function(data) {
     createFeatures(data.features);
 });

// Once we get a response, send the data.features object to the createFeatures function

function createFeatures(data) {
    var myMap = L.map ("map", {
        center: [36.63, -121.19],
        zoom: 5
    });

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery Â© <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    }).addTo(myMap);

    //creating our markers
    data.forEach(feature => {
        let mag = feature.properties.mag;

        var color = "";
        
        if (mag <= 1) {
            color = "blue";
        }
        else if (mag <= 2) {
            color = "orange";
        }
        else if (mag <= 3) {
            color = "green";
        }
        else if (mag <=4) {
            color = "yellow";
        }
        else if (mag <= 5) {
            color = "black";
        }
        else {
            color + "red";
        }

        L.circle([feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]], {
                fillColor: color,
                fillOpacity: 0.5,
                color: color,
                radius: mag * 12000

            }).bindPopup("<h4> Location: " + feature.properties.place + "<hr> Mag: " + mag + "</h4>"). addTo(myMap);

    });


//Adding a legend to my map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend');

            var grades = [0,1,2,3,4,5];
            var labels = ["black", "blue", "green", "yellow", "orange", "red"];

//Loop through density intervals and generate the label with colored background for each interval
         for (var i = 0; i < grades.length; i++) {

            div.innerHTML +=
            "<i style='background: " + labels[i] + "'></i> " +
            grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
             
    return div;
};

legend.addTo(myMap);

}


>>>>>>> 316208f8e27326415af9a58c87021a8d6be15d8c
