/*
 * page.bike
 */
Page.bike = (function ($) {
    var page_size = 10;
    var page_num = 1;
    var $paging_up = $('#paging_up');
    var $paging_down = $('#paging_down');
    var point_count, point_index;
    var data, page_data;
    var infoWindow;

    var init = function () {
        mui.init();
        mui.ready(function () {
            Util.map();
            //清除地图覆盖物
            map.clearMap();

            Api.bike.fetch().done(function (_data) {
                render(_data);
                bind();
            }).fail(function (err_msg, error) {

            });
        })
    };

    var bind = function () {
        $paging_up.on('tap', function () {
            $paging_down.removeClass('disabled');
            if (page_num === 1) {
                mui.toast(Consist.msg.paging_first);
                $(this).addClass('disabled');
            } else {
                page_num--;
                point_index = page_num - 1;
                map.clearMap();
                var page_data = data.slice(point_index * page_size, [page_num * page_size]);
                marker_show(page_data)

            }
        });

        $paging_down.on('tap', function () {
            $paging_up.removeClass('disabled');
            if (page_num + 1 <= point_count / page_size) {
                page_num++;
                point_index = page_num - 1;
                map.clearMap();
                page_data = data.slice(point_index * page_size, [page_num * page_size]);
                marker_show(page_data);

            } else {
                $(this).addClass('disabled');
                mui.toast(Consist.msg.paging_last);
                if (point_count % page_size > 0) {
                    map.clearMap();
                    page_data = data.slice(page_num * page_size, [point_count]);
                    marker_show(page_data)
                    page_num++;
                }
            }
        })
    };

    var render = function (obj) {
        var content_obj = JSON.parse(obj);
        var resultJson = JSON.parse(content_obj.resultJson);
        data = resultJson.CategoryStationStatus;
        var page_data = data.slice(0, [page_size]);
        point_count = data.length;

        $('.total').text(point_count);
        marker_show(page_data)
    };

    //绘制marker
    var draw_marker = function (i, data, infoWindow) {
        //info data
        var address = data[i].StationName;
        var status = data[i].Status;
        var bike_pos_count = data[i].BikePosCount;
        var bike_can_hire = data[i].BikeCanHire;
        var bike_can_restore = data[i].BikeCanRestore;
        var content =
            "<div style='width:170px;float: left;font-weight:bold; margin-top: 0.5rem'>" + address + "</div>" +
            "<div style='width:30px;float: left; text-align: center; margin-top: 0.5rem'>" + status + "</div>" +
            "<div  style='margin-top: 3rem'>总车位数:" + bike_pos_count + "</div>" +
            "<div>可租车数量:" + bike_can_hire + "</divstyle>" +
            "<div>可还车位数:" + bike_can_restore + "</div>";
        //icon
        var icon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b{0}.png'.format(i + 1);
        //position
        var lon = data[i].Lng;
        var lat = data[i].Lat;
        var position = [lon, lat];
        if (lon == 0 || lat == 0) {
            return;
        }

        var marker = new AMap.Marker({
            map: map,
            icon: icon,
            position: position,
            offset: new AMap.Pixel(-12, -36)
        });
        marker.content = content;
        marker.on('click', markerClick);
        marker.emit('click', {target: marker});
        function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }
    };
    //显示marker
    var marker_show = function (data) {
        infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        var i = 0;

        if (data.length < page_size) {
            for (; i < data.length; i++) {
                //绘制点
                draw_marker(i, data, infoWindow);
            }
        } else {
            for (; i < page_size; i++) {
                draw_marker(i, data, infoWindow);
            }
        }

        //点自适应窗口
        map.setFitView();

    };

    return {
        init: init
    };

})(jQuery);