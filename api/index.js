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

module.exports = listener;

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
        response.send(data);

    } catch(err) {
        console.error(err);
    }

    //risposta SkyScanner

})

/** 
 * @swagger
 * /api/passeggeri:
 *  get:
 *      summary: Restituisce una lista di passeggeri.
 *      description: Restituisce la lista di passeggeri salvati dall'utente in precedenti prenotazioni.
 *      parameters:
 *        - in: query
 *          name: utente
 *          required: true
 *      responses:
 *          200:
 *              description: Una lista di passeggeri.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      nome:
 *                                          type: string
 *                                          description: nome del passeggero
 *                                          example: Alessio
 *                                      cognome:
 *                                          type: string
 *                                          description: cognome del passeggero
 *                                          example: Trentin
 *                                      data_nascita:
 *                                          type: string
 *                                          description: data di nascita del passeggero
 *                                          example: 2001-11-10
 *                                      documento:
 *                                          type: string
 *                                          description: blob del documento di riconoscimento del passeggero
 *                                          example: cbhsbkajkdcjcnlscndknsdkcb
 *                                      tipo_documento:
 *                                          type: string
 *                                          description: tipo del documento di riconoscimento del passeggero
 *                                          example: ID Card
 *                                      num_documento:
 *                                          type: string
 *                                          description: numero del documento di riconoscimento del passeggero
 *                                          example: AB1234CA
 *                                      paese:
 *                                          type: string
 *                                          description: paese di rilascio del documento del passeggero
 *                                          example: Italia
 *                                      data_rilascio:
 *                                          type: string
 *                                          description: data di rilascio del documento di riconoscimento del passeggero
 *                                          example: Alessio
 *                                      luogo_rilascio:
 *                                          type: string
 *                                          description: luogo di rilascio del documento di riconoscimento del passeggero
 *                                          example: Comune di Verona
 *                                      data_scadenza:
 *                                          type: string
 *                                          description: data di scadenza del documento di riconoscimento del passeggero
 *                                          example: 2022-11-10
 *                                      num_telefono:
 *                                          type: string
 *                                          description: numero di telefono del passeggero
 *                                          example: 3426178263
 *                                      mail:
 *                                          type: string
 *                                          description: e-mail del passeggero
 *                                          example: alessio.trentin5@gmail.com
 *                                      utente:
 *                                          type: object
 *                                          properties:
 *                                              mail:
 *                                                  type: string
 *                                                  description: e-mail dell'utente che effettua la prenotazione
 *                                                  example: alessio.trentin3@gmail.com
 *                                              password:
 *                                                  type: string
 *                                                  description: password dell'utente che effettua la prenotazione
 *                                                  example: cdj!ndkA
 *                                              genere:
 *                                                  type: string
 *                                                  description: genere dell'utente che effttua la prenotazione
 *                                                  example: M
 *                                              data_nascita:
 *                                                  type: string
 *                                                  description: data di nascita dell'utente che effettua la prenotazione
 *                                                  example: 2001-11-10                          
 */
app.get('/api/passeggeri', (request, response) => {

    const fs = require('fs');
    var fileContents = fs.readFileSync('passeggeri.json', 'utf8');

    try {
        var data = JSON.parse(fileContents)
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

/** 
 * @swagger
 * /api/prenotazioni:
 *  get:
 *      summary: Restituisce una lista di prenotazioni.
 *      description: Restituisce la lista di prenotazioni effttuate dall'utente in precedenza.
 *      parameters:
 *        - in: query
 *          name: utente
 *          required: true
 *      responses:
 *          200:
 *              description: Una lista di prentazioni.
 *              content:
 *                  application/json:
 *                      schema:
 *                              type: array
 *                              items: 
 *                                  type: object
 *                                  properties:
 *                                      voli:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties: 
 *                                                  codice:
 *                                                      type: string
 *                                                      description: codice del volo
 *                                                      example: FR2431
 *                                                  data_ora_partenza:
 *                                                      type: string
 *                                                      description: data e ora di partenza del volo
 *                                                      example: 2021-12-25 23:59:59
 *                                                  data_ora_arrivo:
 *                                                      type: string
 *                                                      description: data e ora di arrivo del volo
 *                                                      example: 2021-12-25 01:10:59
 *                                                  aeroporto_partenza:
 *                                                      type: string
 *                                                      description: codice dell'aeroporto di partenza
 *                                                      example: MXP
 *                                                  aeroporto_arrivo:
 *                                                      type: string
 *                                                      description: codice dell'aeroporto di arrivo
 *                                                      example: CDG
 *                                                  compagnia_aerea:
 *                                                      type: string
 *                                                      description: compagnia aerea del volo
 *                                                      example: Air France
 *                                                  durata_volo:
 *                                                      type: number
 *                                                      description: durata del volo
 *                                                      example: 120
 *                                                  pasto:
 *                                                      type: boolean
 *                                                      description: presenza o no del pasto
 *                                                      example: False
 *                                                  peso_max_bagaglio:
 *                                                      type: number
 *                                                      description: peso massimo del bagaglio nel volo
 *                                                      example: 25
 *                                      passeggeri:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  nome:
 *                                                      type: string
 *                                                      description: nome del passeggero
 *                                                      example: Alessio
 *                                                  cognome:
 *                                                      type: string
 *                                                      description: cognome del passeggero
 *                                                      example: Trentin
 *                                                  data_nascita:
 *                                                      type: string
 *                                                      description: data di nascita del passeggero
 *                                                      example: 2001-11-10
 *                                                  documento:
 *                                                      type: string
 *                                                      description: blob del documento di riconoscimento del passeggero
 *                                                      example: cbhsbkajkdcjcnlscndknsdkcb
 *                                                  tipo_documento:
 *                                                      type: string
 *                                                      description: tipo del documento di riconoscimento del passeggero
 *                                                      example: ID Card
 *                                                  num_documento:
 *                                                      type: string
 *                                                      description: numero del documento di riconoscimento del passeggero
 *                                                      example: AB1234CA
 *                                                  paese:
 *                                                      type: string
 *                                                      description: paese di rilascio del documento del passeggero
 *                                                      example: Italia
 *                                                  data_rilascio:
 *                                                      type: string
 *                                                      description: data di rilascio del documento di riconoscimento del passeggero
 *                                                      example: Alessio
 *                                                  luogo_rilascio:
 *                                                      type: string
 *                                                      description: luogo di rilascio del documento di riconoscimento del passeggero
 *                                                      example: Comune di Verona
 *                                                  data_scadenza:
 *                                                      type: string
 *                                                      description: data di scadenza del documento di riconoscimento del passeggero
 *                                                      example: 2022-11-10
 *                                                  num_telefono:
 *                                                      type: string
 *                                                      description: numero di telefono del passeggero
 *                                                      example: 3426178263
 *                                                  mail:
 *                                                      type: string
 *                                                      description: e-mail del passeggero
 *                                                      example: alessio.trentin5@gmail.com
 *                                                  utente:
 *                                                      type: object
 *                                                      properties:
 *                                                          mail:
 *                                                              type: string
 *                                                              description: e-mail dell'utente che effettua la prenotazione
 *                                                              example: alessio.trentin3@gmail.com
 *                                                          password:
 *                                                              type: string
 *                                                              description: password dell'utente che effettua la prenotazione
 *                                                              example: cdj!ndkA
 *                                                          genere:
 *                                                              type: string
 *                                                              description: genere dell'utente che effttua la prenotazione
 *                                                              example: M
 *                                                          data_nascita:
 *                                                              type: string
 *                                                              description: data di nascita dell'utente che effettua la prenotazione
 *                                                              example: 2001-11-10
 *                                      utente:
 *                                          type: object
 *                                          properties:
 *                                              mail:
 *                                                  type: string
 *                                                  description: e-mail dell'utente che effettua la prenotazione
 *                                                  example: alessio.trentin3@gmail.com
 *                                              password:
 *                                                  type: string
 *                                                  description: password dell'utente che effettua la prenotazione
 *                                                  example: cdj!ndkA
 *                                              genere:
 *                                                  type: string
 *                                                  description: genere dell'utente che effttua la prenotazione
 *                                                  example: M
 *                                              data_nascita:
 *                                                  type: string
 *                                                  description: data di nascita dell'utente che effettua la prenotazione
 *                                                  example: 2001-11-10
 *                                      prezzo:
 *                                          type: number
 *                                          description: prezzo dei biglietti prenotati
 *                                          example: 220
 *                                      cod_prenotazione:
 *                                          type: number
 *                                          description: codice della prenotazione
 *                                          example: 99812       
 */
app.get("/api/prenotazioni", (request, response) => {

    const fs = require('fs');
    var fileContents = fs.readFileSync('prenotazioni.json', 'utf8');

    try {
        var data = JSON.parse(fileContents)

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

/**
 * @swagger
 * /api/prenotazione:
 *  post:
 *      summary: Salvataggio di una prenotazione.
 *      description: Permette di salvare una prenotazione nel database.
 *      requestBody: 
 *          description: dati della prenotazione
 *          required: true
 *          content: 
 *              application/json:
 *                  schema: 
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              voli:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties: 
 *                                          codice:
 *                                              type: string
 *                                              description: codice del volo
 *                                              example: FR2431
 *                                          data_ora_partenza:
 *                                              type: string
 *                                              description: data e ora di partenza del volo
 *                                              example: 2021-12-25 23:59:59
 *                                          data_ora_arrivo:
 *                                              type: string
 *                                              description: data e ora di arrivo del volo
 *                                              example: 2021-12-25 01:10:59
 *                                          aeroporto_partenza:
 *                                              type: string
 *                                              description: codice dell'aeroporto di partenza
 *                                              example: MXP
 *                                          aeroporto_arrivo:
 *                                              type: string
 *                                              description: codice dell'aeroporto di arrivo
 *                                              example: CDG
 *                                          compagnia_aerea:
 *                                              type: string
 *                                              description: compagnia aerea del volo
 *                                              example: Air France
 *                                          durata_volo:
 *                                              type: number
 *                                              description: durata del volo
 *                                              example: 120
 *                                          pasto:
 *                                              type: boolean
 *                                              description: presenza o no del pasto
 *                                              example: False
 *                                          peso_max_bagaglio:
 *                                              type: number
 *                                              description: peso massimo del bagaglio nel volo
 *                                              example: 25
 *                              passeggeri:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          nome:
 *                                              type: string
 *                                              description: nome del passeggero
 *                                              example: Alessio
 *                                          cognome:
 *                                              type: string
 *                                              description: cognome del passeggero
 *                                              example: Trentin
 *                                          data_nascita:
 *                                              type: string
 *                                              description: data di nascita del passeggero
 *                                              example: 2001-11-10
 *                                          documento:
 *                                              type: string
 *                                              description: blob del documento di riconoscimento del passeggero
 *                                              example: cbhsbkajkdcjcnlscndknsdkcb
 *                                          tipo_documento:
 *                                              type: string
 *                                              description: tipo del documento di riconoscimento del passeggero
 *                                              example: ID Card
 *                                          num_documento:
 *                                              type: string
 *                                              description: numero del documento di riconoscimento del passeggero
 *                                              example: AB1234CA
 *                                          paese:
 *                                              type: string
 *                                              description: paese di rilascio del documento del passeggero
 *                                              example: Italia
 *                                          data_rilascio:
 *                                              type: string
 *                                              description: data di rilascio del documento di riconoscimento del passeggero
 *                                              example: Alessio
 *                                          luogo_rilascio:
 *                                              type: string
 *                                              description: luogo di rilascio del documento di riconoscimento del passeggero
 *                                              example: Comune di Verona
 *                                          data_scadenza:
 *                                              type: string
 *                                              description: data di scadenza del documento di riconoscimento del passeggero
 *                                              example: 2022-11-10
 *                                          num_telefono:
 *                                              type: string
 *                                              description: numero di telefono del passeggero
 *                                              example: 3426178263
 *                                          mail:
 *                                              type: string
 *                                              description: e-mail del passeggero
 *                                              example: alessio.trentin5@gmail.com
 *                                          utente:
 *                                              type: object
 *                                              properties:
 *                                                  mail:
 *                                                      type: string
 *                                                      description: e-mail dell'utente che effettua la prenotazione
 *                                                      example: alessio.trentin3@gmail.com
 *                                                  password:
 *                                                      type: string
 *                                                      description: password dell'utente che effettua la prenotazione
 *                                                      example: cdj!ndkA
 *                                                  genere:
 *                                                      type: string
 *                                                      description: genere dell'utente che effttua la prenotazione
 *                                                      example: M
 *                                                  data_nascita:
 *                                                      type: string
 *                                                      description: data di nascita dell'utente che effettua la prenotazione
 *                                                      example: 2001-11-10
 *                              utente:
 *                                  type: object
 *                                  properties:
 *                                      mail:
 *                                          type: string
 *                                          description: e-mail dell'utente che effettua la prenotazione
 *                                          example: alessio.trentin3@gmail.com
 *                                      password:
 *                                          type: string
 *                                          description: password dell'utente che effettua la prenotazione
 *                                          example: cdj!ndkA
 *                                      genere:
 *                                          type: string
 *                                          description: genere dell'utente che effttua la prenotazione
 *                                          example: M
 *                                      data_nascita:
 *                                          type: string
 *                                          description: data di nascita dell'utente che effettua la prenotazione
 *                                          example: 2001-11-10
 *                              prezzo:
 *                                  type: number
 *                                  description: prezzo dei biglietti prenotati
 *                                  example: 220
 *      responses:
 *          201:
 *              description: Created
 */
app.post("/api/prenotazione", (request, response) => {

    const fs = require('fs');
    var file_voli = fs.readFileSync('listavoli.json', 'utf8');

    var lista_voli = JSON.parse(file_voli);
    var prenotazione = request.body;

    for (let i = 0; i < prenotazione.voli.length; i++) {
        var codice = prenotazione.voli[i].codice;
        for (let j = 0; j < lista_voli.length; j++) {
            if (lista_voli[j].codice == codice) {
                prenotazione.voli[i]["data_ora_partenza"] = lista_voli[j].data_ora_partenza;
                prenotazione.voli[i]["data_ora_arrivo"] = lista_voli[j].data_ora_arrivo;
                prenotazione.voli[i]["aeroporto_partenza"] = lista_voli[j].aeroporto_partenza;
                prenotazione.voli[i]["aeroporto_arrivo"] = lista_voli[j].aeroporto_arrivo;
                prenotazione.voli[i]["compagnia_aerea"] = lista_voli[j].compagnia_aerea;
                prenotazione.voli[i]["pasto"] = lista_voli[j].pasto;
                prenotazione.voli[i]["peso_max_bagaglio"] = lista_voli[j].peso_max_bagaglio;
                break;
            } 
        }
    }

    var in_prenotazioni = fs.readFileSync('prenotazioni.json', 'utf8');
    var lista_prenotazioni = JSON.parse(in_prenotazioni);

    var cod_prenotazione = lista_prenotazioni[lista_prenotazioni.length - 1].cod_prenotazione + 1;
    prenotazione["cod_prenotazione"] = cod_prenotazione;
    lista_prenotazioni.push(prenotazione);

    var output = JSON.stringify(lista_prenotazioni);

    fs.writeFileSync('prenotazioni.json', output, 'utf8');

    response.status(201);
    response.json("Added Successfully");

})

/**
 * @swagger
 * /api/prodotti/{codice}:
 *   delete:
 *     summary: Cancella una prenotazione.
 *     description: Cancella una prenotazione in base al codice passato come parametro.
 *     parameters:
 *       - in: path
 *         name: codice
 *         schema:
 *             type: string
 *         required: true
 *         description: il codice della prenotazione
 *     responses:
 *       200:
 *         description: la prenotazione è stata cancellata
 *       404:
 *         description: la prenotazione non è stata trovata
*/
app.delete("/api/prenotazione/:codice", (request, response) => {
    const fs = require('fs');
    var file_prenotazioni = fs.readFileSync('prenotazioni.json', 'utf8');
    var prenotazioni = JSON.parse(file_prenotazioni);
    var codice = parseInt(request.params.codice);
    var new_data = [];

    for (let i = 0; i < prenotazioni.length; i++) {
        var cod_prenotazione = parseInt(prenotazioni[i].cod_prenotazione);
        if (cod_prenotazione != codice) {
            new_data.push(prenotazioni[i]);
        }
    }

    fs.writeFile('prenotazioni.json', JSON.stringify(new_data), err => {
        if (err) throw err;
    });
    response.json("Prenotazione cancellata correttamente!");
}) 