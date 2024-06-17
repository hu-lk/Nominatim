// var map = new ol.Map({
//   target: "map",
//   layers: [
//     new ol.layer.Tile({
//       source: new ol.source.XYZ({
//         url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
//         maxZoom: 20,
//         crossOrigin: "anonymous",
//       }),
//     }),
//   ],
//   view: new ol.View({
//     center: ol.proj.fromLonLat([0, 0]),
//     zoom: 2,
//   }),
// });

// var markerOverlay; // Variable to store the marker overlay

// async function searchLocation() {
//   var query = document.getElementById("search-box").value;
//   if (!query) {
//     alert("Please enter a location to search for.");
//     return;
//   }

//   var url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

//   try {
//     let response = await fetch(url);
//     let data = await response.json();

//     if (data.length > 0) {
//       var location = data[0];
//       var lon = location.lon;
//       var lat = location.lat;

//       // Transform the coordinates to the map projection
//       var coords = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);

//       // Center the map on the searched location
//       map.getView().setCenter(coords);
//       map.getView().setZoom(14);

//       // Remove previous marker if it exists
//       if (markerOverlay) {
//         map.removeOverlay(markerOverlay);
//       }

//       // Add a marker at the searched location
//       var markerElement = document.createElement("div");
//       markerElement.className = "marker";

//       markerOverlay = new ol.Overlay({
//         position: coords,
//         positioning: "bottom-center",
//         element: markerElement,
//         stopEvent: false,
//       });
//       map.addOverlay(markerOverlay);
//     } else {
//       alert("Location not found.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("An error occurred while searching for the location.");
//   }
// }
var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
        maxZoom: 20,
        crossOrigin: "anonymous",
      }),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([0, 0]),
    zoom: 2,
  }),
});

var markerOverlay; // Variable to store the marker overlay

async function searchLocation() {
  var query = document.getElementById("search-box").value;
  if (!query) {
    alert("Please enter a location to search for.");
    return;
  }

  var url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.length > 0) {
      var location = data[0];
      var lon = location.lon;
      var lat = location.lat;

      // Transform the coordinates to the map projection
      var coords = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);

      // Center the map on the searched location
      map.getView().setCenter(coords);
      map.getView().setZoom(14);

      // Remove previous marker if it exists
      if (markerOverlay) {
        map.removeOverlay(markerOverlay);
      }

      // Add a marker at the searched location
      var markerElement = document.createElement("div");
      markerElement.className = "marker";

      markerOverlay = new ol.Overlay({
        position: coords,
        positioning: "bottom-center",
        element: markerElement,
        stopEvent: false,
      });
      map.addOverlay(markerOverlay);
    } else {
      alert("Location not found.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while searching for the location.");
  }
}

async function showSuggestions() {
  var query = document.getElementById("search-box").value;
  var suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = "";

  if (query.length < 3) {
    return; // Only search when query is at least 3 characters
  }

  var url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    data.forEach((location) => {
      var item = document.createElement("div");
      item.className = "suggestion-item";
      item.innerText = location.display_name;
      item.onclick = () => selectSuggestion(location);
      suggestionsContainer.appendChild(item);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function selectSuggestion(location) {
  var query = location.display_name;
  document.getElementById("search-box").value = query;
  document.getElementById("suggestions").innerHTML = "";

  var lon = location.lon;
  var lat = location.lat;

  // Transform the coordinates to the map projection
  var coords = ol.proj.fromLonLat([parseFloat(lon), parseFloat(lat)]);

  // Center the map on the searched location
  map.getView().setCenter(coords);
  map.getView().setZoom(14);

  // Remove previous marker if it exists
  if (markerOverlay) {
    map.removeOverlay(markerOverlay);
  }

  // Add a marker at the searched location
  var markerElement = document.createElement("div");
  markerElement.className = "marker";

  markerOverlay = new ol.Overlay({
    position: coords,
    positioning: "bottom-center",
    element: markerElement,
    stopEvent: false,
  });
  map.addOverlay(markerOverlay);
}
