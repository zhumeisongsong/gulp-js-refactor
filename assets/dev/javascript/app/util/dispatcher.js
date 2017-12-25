/*
 * dispatcher 分配器
 */

Util.dispatcher = function (path, callback) {
    this.path_func = this.path_func || [];

    if (callback) return this.path_func.push([path, callback]);

    for (var i = 0, l = this.path_func.length; i < l; ++i) {
        var func = this.path_func[i];
        var match = path.match(func[0]);
        match && func[1](match);
    }
};