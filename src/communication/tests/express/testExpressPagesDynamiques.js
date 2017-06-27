const express = require('express')
const app = express()

var fs = require('fs') // this engine requires the fs module

app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
      var rendered = content.toString().replace('#adresse#', options.adresse);
      return callback(null, rendered)
  })
})
app.set('views', '.') // specify the views directory
app.set('view engine', 'ntl') // register the template engine


app.get('/', function (req, res) {
  res.render('testClientWebSocket', { adresse: "localhost:1234"})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
