fs = require 'fs'
csvjs = require '../index'

data = fs.readFileSync('USPresident.csv').toString()
csvjs.parse data, { col_sep: ',', row_sep: "\r\n" }, (row) -> 
  console.log row

