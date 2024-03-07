function initMap() {
    var barcelona = { lat: 41.390205, lng: 2.154007 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: barcelona
    });
    var marker = new google.maps.Marker({
        position: barcelona,
        map: map,
        title: 'Barcelona'
    });
}