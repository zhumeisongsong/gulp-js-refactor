/*
 * String helper
 */
Util.string = (function () {

    return {
        path_join: function () {
            String.prototype.path_join = function () {
                var current = this,
                    args = Array.prototype.slice.call(arguments);

                args.forEach(function (elem, i) {

                    var ending = current[current.length - 1],
                        starting = elem[0];

                    if (ending !== '/')
                        current = current + '/';

                    if (starting === '/')
                        current += elem.substring(1);
                    else
                        current += elem
                });

                return current
            };
        },
        format: function () {
            String.prototype.format = function () {
                var formatted = this;
                for (var i = 0; i < arguments.length; i++) {
                    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                    formatted = formatted.replace(regexp, arguments[i])
                }
                return formatted
            };
        }
    }

})();
