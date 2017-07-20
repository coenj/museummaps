// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var infowindow;
var service;
var placeLoc ={};
function initMap() {
  var searchcity = { lat: 51.908082, lng: 4.480408 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: searchcity,
    zoom: 13
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function () {
    document.getElementById('top-container').innerHTML = "";
    document.getElementById('bottom-container').innerHTML = "";
    geocodeAddress(geocoder, map);
  });

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    content = "";
    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status === 'OK') {
        searchcity = results[0].geometry.location;
        resultsMap.setCenter(searchcity);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        // search all nearby art museums
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: searchcity,
          radius: 5000,
          type: ['museum'],
          keyword: 'art'
        }, callback);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createPlaceList(results[i]);
    }
  }
}

function createPlaceList(place) {

  placeLoc = place.geometry.location;
  var placeNameWiki = place.name.replace(/ /g, "_")
  wikiViews(place.name, placeNameWiki, placeLoc)
  console.log(placeLoc)
  // createMarker(placeLoc, place)

}

  function createMarker(placeLoc, place) {
    console.log(typeof(placeLoc))
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });
    //if(place){getContent(marker,place);}
  }

  function getContent(marker, place) {
    var placeContent = place.geometry.location + place.name + place.opening_hours;
   
    /*
        if (place.photos != undefined) {
           var photoUrl = place.photos[0].getUrl({maxWidth: 400, maxHeight: 400});
          placeContent ="<img src="+ photoUrl +">"
          console.log(placeContent)
        }
   
  */
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(placeContent);
      infowindow.open(map, marker);
    });
  }