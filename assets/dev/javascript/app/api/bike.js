/*
 * Api.bike_ajax
 */
Api.bike = function ($) {
    //取数据
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'data/bike_point.json',
            dataType:'text'
        };

        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.result(xhr)
        });
        return $defer.promise();
    };
    return {
        fetch: fetch
    }
}(jQuery);