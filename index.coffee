# # csvjs
# simple csv parser with header row expected
module.exports = 
  DEFAULT_OPTIONS: { col_sep: ',', row_sep: '\r\n', keys: null }
  # extend obj
  _extend: (obj, mixin) ->
    obj[name] = method for name, method of mixin        
    obj
  # split a string into an array
  _split: (data, sep) -> data.split(sep)
  # clean up and trim columns
  _tidy: (field) -> field.trim().replace(/^\"/, '').replace(/\"$/,'').trim()
  # arraysToKv
  _merge: (keys, values) ->
    output = {}
    output[@_tidy(key)] = @_tidy(values[i]) for key, i in keys
    output
     
  # parse csv data and return each row as a pojso
  parse: (data, options={}, cb) ->
    if typeof(options) == 'function'
      cb = options
      options = {} 

    options = @_extend(@DEFAULT_OPTIONS, options)
    rows = @_split(data, options.row_sep)

    # remove last record nothing there
    rows.pop() if rows[rows.length - 1].length < 5

    # get headers
    keys = @_split rows.shift(), options.col_sep unless options.keys?
    for row, c in rows
      values = @_split row, options.col_sep
      cb(@_merge(keys, values))

