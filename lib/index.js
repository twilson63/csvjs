(function() {
  module.exports = {
    DEFAULT_OPTIONS: {
      col_sep: ",",
      row_sep: "\r\n",
      keys: null
    },
    parse: function(data, options, cb) {
      var c, keys, row, rows, values, _len, _results;
      if (options == null) {
        options = {};
      }
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }
      if (data == null) {
        return cb('error no data');
      }
      options = this._extend(this.DEFAULT_OPTIONS, options);
      rows = this._split(data, options.row_sep);
      if (rows[rows.length - 1].length < 5) {
        rows.pop();
      }
      if (options.keys == null) {
        keys = this._split(rows.shift(), options.col_sep);
      }
      _results = [];
      for (c = 0, _len = rows.length; c < _len; c++) {
        row = rows[c];
        values = this._split(row, options.col_sep);
        _results.push(cb(null, this._merge(keys, values)));
      }
      return _results;
    },
    _extend: function(obj, mixin) {
      var method, name;
      for (name in mixin) {
        method = mixin[name];
        obj[name] = method;
      }
      return obj;
    },
    _split: function(data, sep) {
      return data.split(sep);
    },
    _tidy: function(field) {
      return field.trim().replace(/^\"/, '').replace(/\"$/, '').trim();
    },
    _merge: function(keys, values) {
      var i, key, output, _len;
      output = {};
      for (i = 0, _len = keys.length; i < _len; i++) {
        key = keys[i];
        output[this._tidy(key)] = this._tidy(values[i]);
      }
      return output;
    }
  };
}).call(this);
