function initMap() {
  //Por defecto coloco la ubicación del ITIC sin un marker
    var barcelona = { lat: 41.4023623, lng: 2.1944013 };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: barcelona,
        styles:[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8ec3b9"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1a3646"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#64779e"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#4b6878"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#334e87"
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": 5.5
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6f9ba5"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3C7680"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#304a7d"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2c6675"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#255763"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#b0d5ce"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#023e58"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98a5be"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1d2c4d"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#283d6a"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3a4762"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#0e1626"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#4e6d70"
                }
              ]
            }
          ]
    });

    //Marker que indica la posicion del ITIC
    const marker = new google.maps.Marker({
        position: barcelona,
        map: map,
        title: 'Edificio MeadiaTIC',
        icon: './red.png',
    });
    let infowindow = new google.maps.InfoWindow({
        content: 'Edifición MediaTic',
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });


    
    document.getElementById('findLoc').addEventListener("click", function () {
        let direccion = document.getElementById('adreca').value;
        console.log(direccion);
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': direccion }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                console.log(`latitud: ${latitude} y longitud: ${longitude} de la dirección "${direccion}"`);

                document.getElementById("latitude").value = latitude;
                document.getElementById("longitude").value = longitude;

                let center = new google.maps.LatLng(latitude, longitude);
                map.setCenter(center);
                map.setZoom(16);

                let marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map,
                    title: `${direccion}`,
                    icon: './red.png'
                });

                let infowindow = new google.maps.InfoWindow({
                    content: `${direccion}`
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });

            } else {
                alert(`No se ha encontrado la dirección ${direccion}, introduzca una nueva dirección valida`);
                console.log(`No se ha encontrado la dirección ${direccion}, introduzca una nueva dirección valida`);
            }
        });
    });

     if (navigator.geolocation) {
        document.getElementById('map').insertAdjacentHTML('afterend', '<button id="geoLocBtn">Geolocalització</button>');
        document.getElementById('geoLocBtn').addEventListener('click', function() {
            navigator.geolocation.getCurrentPosition(function(position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                map.setZoom(20);
                let marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: './red.png',
                    title: 'Esta es tu ubicación actual'
                });

                let infowindow = new google.maps.InfoWindow({
                    content: 'Esta es tu ubicación actual'
                });

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            });
        });
    }

};
