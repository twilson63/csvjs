csvjs = require '../index'

csvjs.parse 'Caremark 09_08_11.txt', ';',"\r\n", (row) -> 
  console.log row

