/*
 * get time
 */
Util.currentTime = function () {
    var d = new Date(), str = '';
    str += d.getFullYear() + '-';
    str += d.getMonth() + 1 + '-';
    str += d.getDate();
    str += d.getHours() + ':';
    str += d.getMinutes() + ':';
    str += d.getSeconds();
    return str;
};
