(function() {
  var fs;
  fs = require('fs');
  module.exports = {
    load: function(file_name) {
      return fs.readFileSync(file_name).toString();
    },
    getArray: function(data, sep) {
      return data.split(sep);
    },
    tidy: function(field) {
      return field.trim().replace(/^\"/, '').replace(/\"$/, '').trim();
    },
    arraysToKv: function(keys, values) {
      var i, key, output, _len;
      output = {};
      for (i = 0, _len = keys.length; i < _len; i++) {
        key = keys[i];
        output[this.tidy(key)] = this.tidy(values[i]);
      }
      return output;
    },
    parse: function(file_name, col_sep, row_sep, cb) {
      var c, keys, row, rows, values, _len, _results;
      rows = this.getArray(this.load(file_name), row_sep);
      rows.pop();
      keys = this.getArray(rows.shift(), col_sep);
      _results = [];
      for (c = 0, _len = rows.length; c < _len; c++) {
        row = rows[c];
        values = this.getArray(row, col_sep);
        _results.push(cb(this.arraysToKv(keys, values)));
      }
      return _results;
    }
  };
}).call(this);
