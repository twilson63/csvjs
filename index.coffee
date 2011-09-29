fs = require 'fs'

# # csvjs
# simple csv parser with header row expected
module.exports = 
  # get data
  load: (file_name) -> fs.readFileSync(file_name).toString()
  # split a string into an array
  getArray: (data, sep) -> data.split(sep)
  # clean up and trim columns
  tidy: (field) -> field.trim().replace(/^\"/, '').replace(/\"$/,'').trim()
  # arraysToKv
  arraysToKv: (keys, values) ->
    output = {}
    output[@tidy(key)] = @tidy(values[i]) for key, i in keys
    output
     
  # parse file and return each row as a pojso
  parse: (file_name, col_sep, row_sep, cb) ->
    rows = @getArray(@load(file_name), row_sep)
    # remove last record
    rows.pop()
    # get headers
    keys = @getArray rows.shift(), col_sep
    for row, c in rows
      values = @getArray row, col_sep
      cb(@arraysToKv(keys, values))

