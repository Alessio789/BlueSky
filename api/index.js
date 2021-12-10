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
        openapi: '3.0.0',
        info: {
            title: "BlueSky API",
            description: "BlueSky API information",
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: "Gruppo G43"
            },
            servers: ["http://localhost:8080/"]
        }
    },
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

var listener = app.listen(8080, () => {

    console.log('Listening on port ' + listener.address().port);
});

/**
 * @swagger
 * /api/ricercavoli:
 *  get:
 *      summary: Restituisce una lista di voli.
 *      description: Restituisce una lista di voli in base ai parametri di ricerca passati.
 *      parameters:
 *        - in: query
 *          name: aeroportoPartenza
 *          required: true
 *          schema:
 *              type: string
 *          description: L'aeroporto di partenza.
 *        - in: query
 *          name: aeroportoArrivo
 *          required: true
 *          schema:
 *              type: string
 *          description: L'aeroporto di arrivo.
 *        - in: query
 *          name: dataPartenza
 *          required: true
 *          schema:
 *              type: string
 *          description: La data e l'ora di partenza all'andata.
 *        - in: query
 *          name: dataRitorno
 *          required: false
 *          schema:
 *              type: string
 *          description: La data e l'ora di partenza al ritorno.
 *        - in: query
 *          name: numNeonati
 *          required: false
 *          schema:
 *              type: string
 *          description: Il numero di neonati (0-2 anni).
 *        - in: query
 *          name: numBambini
 *          required: false
 *          schema:
 *              type: string
 *          description: Il numero di bambini (3-17 anni).
 *        - in: query
 *          name: numAdulti
 *          required: true
 *          schema:
 *              type: string
 *          description: Il numero di adulti (18+ anni).
 *        - in: query
 *          name: classe
 *          required: true
 *          schema:
 *              type: string
 *          description: La classe di volo.
 *      responses:
 *          200:
 *              description: Una lista di voli.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      codice:
 *                                          type: string
 *                                          description: il codice del volo
 *                                          example: akd234
 *                                      data_ora_partenza:
 *                                          type: string
 *                                          description: la data e l'ora di partenza del volo
 *                                          example: 2021-12-25 23:59:59
 *                                      data_ora_arrivo:
 *                                          type: string
 *                                          description: la data e l'ora di arrivo del volo
 *                                          example: 2021-12-25 23:59:59
 *                                      aeroporto_partenza:
 *                                          type: string
 *                                          description: l'aeroporto di partenza del volo
 *                                          example: MPX
 *                                      aeroporto_arrivo:
 *                                          type: string
 *                                          description: l'aeroporto di arrivo del volo
 *                                          example: MPX
 *                                      compagnia_aerea:
 *                                          type: string
 *                                          description: la compagnia aerea che organizza il volo
 *                                          example: Air France
 *                                      durata_volo:
 *                                          type: integer
 *                                          description: la durata del volo in minuti
 *                                          example: 120
 *                                      pasto:
 *                                          type: boolean
 *                                          description: indica la presenza o meno del pasto a bordo
 *                                          example: true
 *                                      peso_max_bagaglio:
 *                                          type: integer
 *                                          description: il peso massimo del bagaglio
 *                                          example: 120
 */ 
app.get('/api/ricercavoli', (request, response) => {

    //recupero parametri
    var aeroporto_partenza = request.query.aeroportoPartenza;
    var aeroporto_arrivo = request.query.aeroportoArrivo;
    var data_partenza = request.query.dataPartenza;
    var data_ritorno = request.query.dataRitorno;
    var num_neonati = request.query.numNeonati;
    var num_bambini = request.query.numBambini;
    var num_adulti = request.query.numAdulti;
    var classe = request.query.classe;

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
/** 
app.get('/api/ricercavoli/{code}', (request, response) => {

    //invio richiesta a SkyScanner

    var fs = require('fs');
    var fileContents = fs.readFileSync('listavoli.json', 'utf8');

    try {
        var data = JSON.parse(fileContents)
    
    } catch(err) {
        console.error(err);
    }

    //risposta SkyScanner

}) */

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