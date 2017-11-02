// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

var geocoder = null;
var map = null;
var customerMarker = null;
var gmarkers = [];
var closest = [];
var zoom = 10;

function initializeMap(locations, numberOfResults, address) {
    // alert("init");
    if (gmarkers && gmarkers.length) {
        return;
    }

    gmarkers = [];
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(0, 0),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var bounds = new google.maps.LatLngBounds();
    document.getElementById('info').innerHTML = "found " + locations.length + " locations<br>";

    for (i = 0; i < locations.length; i++) {
        //var coordStr = locations[i][4];
        //var coords = coordStr.split(",");
        var iconSt = "http://maps.google.com/mapfiles/ms/icons/blue.png";

        var pt = new google.maps.LatLng(
            parseFloat(locations[i].latitude), parseFloat(locations[i].longitude));

        //bounds.extend(pt);

        var shopTitle = locations[i].addressName;
        var workTime = "Open: " + locations[i].todayOpen + "-" + locations[i].todayClose;

        var shopAddress = locations[i].postalCode;
        shopAddress += ","+ locations[i].city + "," +  locations[i].street ;
        if (locations[i].street2){
            shopAddress += ("," + locations[i].street2);
        }
        if (locations[i].street3){
            shopAddress += ("," + locations[i].street3);
        }

        marker = new google.maps.Marker({
            position: pt,
            map: null,
            icon: iconSt,
            address: shopAddress,
            title: shopTitle,
            html: "<b>" + shopTitle +"<br>" + shopAddress + "<br>" + workTime + "</b>"
        });

        gmarkers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(marker.html);
                infowindow.open(map, marker);
            }
        })
        (marker, i));
    }


    if (address){
        findNearestShops(numberOfResults, address);
    }
}

function findNearestShops(numberOfResults, address) {
    //var numberOfResults = 25;
    //var address = document.getElementById('address').value;

    geocoder.geocode({
        'address': address,
        'region' : 'eu'
    }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {

            map.setCenter(results[0].geometry.location);

            if (customerMarker) customerMarker.setMap(null);

            customerMarker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            closest = findClosestN(results[0].geometry.location, numberOfResults);
            var bounds = new google.maps.LatLngBounds();
            document.getElementById('info').innerHTML = "";

            for (var i = 0; i < Math.min(numberOfResults, closest.length); i++) {

                    document.getElementById('info').innerHTML += "found " + i + ":" + closest[i].address + "  : " + closest[i].distance.toFixed(2) + "<br>";

                    closest[i].setMap(map);

                    bounds.extend(closest[i].getPosition());

            }

            bounds.extend(customerMarker.getPosition());

            map.fitBounds(bounds);

            //map.setZoom(zoom);
            //calculateDistances(results[0].geometry.location, closest, numberOfDrivingResults);

        } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {

            clearResults();
            document.getElementById('info').innerHTML = "No results found" + "<br>";

        }else {
            alert('Search was not successful, bad request: ' + address);
        }
    });
}

function findClosestN(pt, numberOfResults) {
    var closest = [];
    //document.getElementById('info').innerHTML += "processing " + gmarkers.length + "<br>";

    for (var i = 0; i < gmarkers.length; i++) {
        gmarkers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt,
            gmarkers[i].getPosition());

        gmarkers[i].setMap(null);
        closest.push(gmarkers[i]);
    }
    closest.sort(sortByDist);
    return closest;
}

function clearResults() {

    if (gmarkers){
        for (var i = 0; i < gmarkers.length; i++) {
            gmarkers[i].setMap(null);
        }
    }
    if (customerMarker) {
        customerMarker.setMap(null);
    }

}

function sortByDist(a, b) {

    var res = 0;
    if (!a.distance) res = -1;
    else if (!b.distance) res = 1;
    else res = (a.distance < b.distance ? -1: (a.distance > b.distance ? 1: 0))
    return res;
}

function calculateDistances(pt, closest, numberOfResults) {
    var service = new google.maps.DistanceMatrixService();
    var request = {
        origins: [pt],
        destinations: [],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    };

    for (var i = 0; i < closest.length; i++) {
        request.destinations.push(closest[i].getPosition());
    }

    service.getDistanceMatrix(request, function(response, status) {

        if (status != google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
        } else {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var outputDiv = document.getElementById('side_bar');
            outputDiv.innerHTML = '';

            var results = response.rows[0].elements;
            // save title and address in record for sorting
            for (var i = 0; i < closest.length; i++) {
                results[i].title = closest[i].title;
                results[i].address = closest[i].address;
                results[i].idx_closestMark = i;
            }

            results.sort(sortByDistDM);

            for (var i = 0;
                 ((i < numberOfResults) && (i < closest.length)); i++) {
                closest[i].setMap(map);
            }
        }
    });
}

function sortByDistDM(a, b) {
    return (a.distance.value - b.distance.value)
}

