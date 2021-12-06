var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors')
app.use(cors())

var listener = app.listen(8080, () => {

    console.log('Listening on port ' + listener.address().port);
});

app.get('/api/ricercavoli', (request, response) => {

    var lista_voli = JSON.parse("ricercavoli.json");

    response.send("lista_voli");

})

