var map;

$(function() {
    var id = parseId(window.location.search);
    
    getDetail(id);
});

function parseId(str) {
    var s = str.substring(1);
    var args = s.split('&');

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var tokens = arg.split('=');

        if (tokens[0] === 'id') {
            return tokens[1];
        }
    }

    return null;
}

function getDetail(id) {
    var url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url, {
        id: id
    }, function(r) {
        console.log(r);
        $('.detail-header-name').html(r.name);
        $('.detail-header-city-name').html(r.cityName);
        $('.detail-desc-text').html(r.desc);

        var $gallery = $('#detail-images');
        var images = r.subImageList;

        for (var i = 0; i < images.length; i++) {
            var $image = $(`<img src="${images[i]}" />`);
            $gallery.append($image);
        }

        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');

        showMap(r.position.x, r.position.y);
        showMarker(r.position.x, r.position.y);

        $('.btn-register').click(function() {
            var myTrips = Cookies.getJSON('MYTRIPS');

            // 없는 경우 배열로 초기화
            if (!myTrips) {
                myTrips = [];
            }

            // 여행지에 추가하기
            myTrips.push({
                id: id,
                name: r.name,
                cityName: r.cityName,
                x: r.position.x,
                y: r.position.y
            });

            console.log(myTrips);
            Cookies.set('MYTRIPS', myTrips);
            alert('여행지가 등록되었습니다.');
        });
    });
}

function showMap(lat, lng) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: lat,
            lng: lng
        }
    });
}

function showMarker(lat, lng) {
    var pos = {
        lat: lat,
        lng: lng
    };

    new google.maps.Marker({
        position: pos,
        map: map
    });

    map.panTo(pos);
}
