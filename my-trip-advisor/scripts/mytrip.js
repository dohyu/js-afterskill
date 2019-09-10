var MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var markers = {};
var map;
var test_list = [
    {
        cityName: "제주시",
        id: 20,
        name: "제주공항",
        x: 33.5104135,
        y: 126.4891647
    },
    {
        cityName: "제주시",
        id: 19,
        name: "산굼부리",
        x: 33.4316207,
        y: 126.6878171
    },
    {
        cityName: "제주시",
        id: 15,
        name: "만장굴",
        x: 33.5284905,
        y: 126.7692923
    }
];

$(function() {
    //var myTrips = Cookies.getJSON('MYTRIPS');
    var myTrips = test_list;
    if (!myTrips) {
        myTrips = [];
    }

    showMap();
    generateMyTripList(myTrips);
});

function showMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 33.3617,
            lng: 126.5292
        }
    });
}

function generateMyTripList(list) {
    var bounds = new google.maps.LatLngBounds();
    var $list = $('#mytrip-list');

    for (var i = 0; i < list.length; i++) {
        var myTrip = list[i];
        var pos = {
            lat: myTrip.x,
            lng: myTrip.y,
        };
        
        var markerLabel = MARKER_LABELS[i];

        var $item = $('#mytrip-item-template').clone().removeAttr('id');
        $item.data('id', myTrip.id);
        $item.find('.item-name').html(markerLabel + '. ' + myTrip.name);
        $item.find('.item-city-name').html(myTrip.cityName);

        $item.find('.item-remove').click(function() {
            var $elem = $(this).closest('.mytrip-item');
            var id = $elem.data('id');
            $elem.remove();

            markers[id].setMap(null);
            markers[id] = null;

            var newList = removeFromList(list, id);
            Cookie.set('MYTRIPS', newList);
        });

        $list.append($item);

        var marker = new google.maps.Marker({
            position: pos,
            label: markerLabel,
            map: map
        });

        markers[myTrip.id] = marker;

        bounds.extend(pos);
    }

    map.fitBounds(bounds);
}

function removeFromList(list, id) {
    var index = -1;

    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            index = i;
            break;
        }
    }

    if (index !== -1) {
        list.splice(index, 1);
    }

    return list;
}
