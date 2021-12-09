var Express = require("express");
var bodyParser = require("body-parser");

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors')
app.use(cors())

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "BlueSky API",
            description: "BlueSky API information",
            contact: {
                name: "Gruppo G43"
            },
            servers: ["http://localhost:8080"]
        }
    },
    apis: ["index.js"]
};

var listener = app.listen(8080, () => {

    console.log('Listening on port ' + listener.address().port);
});

app.get('/api/ricercavoli', (request, response) => {

     //invio richiesta a SkyScanner

    var fs = require('fs');
    var fileContents = fs.readFileSync('listavoli.json', 'utf8');

    try {
        var data = JSON.parse(fileContents)
        console.log(data);
        response.send(data);
    } catch(err) {
        console.error(err);
    }

    //risposta SkyScanner

})

app.get('/api/passeggeri', (request, response) => {

    var fs = require('fs');
    var fileContents = fs.readFileSync('passeggeri.json', 'utf8');

    try {
        var data = JSON.parse(fileContents)
        console.log(data);
    } catch(err) {
        console.error(err);
    }

    var utente = request.query.utente;
    var out = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].utente.mail == utente) {
            out.push(data[i])
        }
    }

    response.send(out);
})

app.post('/api/voloselezionato', (request, response) => {

})

app.get("/api/prenotazioni", (request, response) => {

    var fs = require('fs');
    var fileContents = fs.readFileSync('prenotazioni.json', 'utf8');

    try {
        var data = JSON.parse(fileContents)
        console.log(data);
    } catch(err) {
        console.error(err);
    }

    var utente = request.query.utente;
    var out = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].utente.mail == utente) {
            out.push(data[i])
        }
    }

    response.send(out); 
})

app.post("/api/prenotazioni", (request, response) => {


})