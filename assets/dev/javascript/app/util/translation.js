/*
 * translation
 */
Util.translation = function (index, address) {
    //转换终点地址为经纬度
    var geocoder = new AMap.Geocoder({
        city: city_num, //城市，默认：“全国”
        radius: 1000 //范围，默认：500
    });

    function geocoder_CallBack(data) {
        //地理编码结果数组
        var geocode = data.geocodes;
        for (var j = 0; j < geocode.length; j++) {
            position = [geocode[j].location.getLng(), geocode[j].location.getLat()]
        }
    }

    geocoder.getLocation(address, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            geocoder_CallBack(result);
            draw_marker(index, position, address);
        }
    });
};

