Util.url = (function() {

  return {
    /*
     * @param {Object} hash
     */
    getHash: function() {
      var path = location.hash,
          hash = {},
          param = [],
          tmp   = [];
      if (!path || !/^\#.*=.*/.test(path)) { return hash; }

      path = path.substr(1);
      param = path.split(/&/g);

      _.each(param, function(item) {
        tmp = item.split(/=/);
        hash[tmp[0]] = decodeURI(tmp[1]);
        // query[tmp[0]] = tmp[1];
      });

      return hash;
    },

    /*
     * @param {String} path
     * @param {Object} query
     */
    getQuery: function(path) {
      var query = {},
          param = [],
          tmp   = [];

      if (!path || !/^\?.*=.*/.test(path)) { return query; }

      path = path.substr(1);
      param = path.split(/&/g);

      _.each(param, function(item, index) {
        tmp = item.split(/=/);
        query[tmp[0]] = decodeURI(tmp[1]);
        // query[tmp[0]] = tmp[1];
      });

      return query;
    },
    /*
     * @param {Object} query
     * @param {String} path
     */
    setQuery: function(query) {
      var path = "?";
      _.each(query, function(value, key, index) {
        path += key + '=' + value + '&';
      });
      path = path.substr( 0 , (path.length-1) );
      return path;
    },


    getLastPath: function() {
      return location.pathname.split('/').pop();
    },

    /*
     *
     */
    concatPath: function(path1, path2) {
      var path1Flag = path1.substr(-1, 1) === '/' ? true : false,
          path2Flag = path2.substr(0, 1) === '/' ? true : false,
          concatPath = '';

      if (path1Flag === true && path2Flag === true) {
        concatPath = path1 + path2.substr(1);
      } else if (path1Flag === true || path2Flag === true) {
        concatPath = path1 + path2;
      } else {
        concatPath = path1 + '/' + path2;
      }

      return concatPath;
    }

  };
})();
