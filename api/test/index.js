var test = require('tape');
var request = require('supertest');
var app = require('../index');

test('TEST1: Lista dei voli ottenuta correttamente', function (assert) {
    request(app)
        .get('/api/ricercavoli?aeroportoPartenza=MPX&aeroportoArrivo=CDG&dataPartenza=2021-12-16&dataRitorno=2021-12-25&numAdulti=1&classe=economy')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            var num_voli = res.body.length;
            var result = false;
            if (num_voli == 0) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.notEqual(true, result, 'Voli ottenuti correttamente');
            assert.end();
        });
});

test('TEST2: Lista passeggeri ottenuta correttamente', function (assert) {
    request(app)
        .get('/api/passeggeri?utente=alessio.trentin3@gmail.com')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            var num_passeggeri = res.body.length;
            var result = false;
            if (num_passeggeri == 0) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.notEqual(true, result, 'Passeggeri ottenuti correttamente');
            assert.end();
        });
});

test('TEST3: Lista prenotazioni ottenuta correttamente', function (assert) {
    request(app)
        .get('/api/prenotazioni?utente=alessio.trentin3@gmail.com')
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            var num_prenotazioni = res.body.length;
            var result = false;
            if (num_prenotazioni == 0) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.notEqual(true, result, 'Prenotazioni ottenute correttamente');
            assert.end();
        });
});

test('TEST4: Prenotazione aggiunta correttamente', function (assert) {
    request(app)
        .post('/api/prenotazione')
        .send({
            "voli": [
                {
                    "codice": "akd234",
                    "data_ora_partenza": "2021-12-25 23:59:59",
                    "data_ora_arrivo": "2021-12-26 01:29:02",
                    "aeroporto_partenza": "MPX",
                    "aeroporto_arrivo": "CDG",
                    "compagnia_aerea": "Air France",
                    "durata_volo": 90,
                    "pasto": false,
                    "peso_max_bagaglio": 43
                },
                {
                    "codice": "akd343535",
                    "data_ora_partenza": "2021-12-28 23:59:59",
                    "data_ora_arrivo": "2021-12-29 01:29:02",
                    "aeroporto_partenza": "CDG",
                    "aeroporto_arrivo": "MPX",
                    "compagnia_aerea": "Air France",
                    "durata_volo": 90,
                    "pasto": false,
                    "peso_max_bagaglio": 43
                }
            ],
            "passeggeri": [
                {
                    "nome": "Alessio",
                    "cognome": "Trentin",
                    "data_nascita": "2001-11-10",
                    "documento": "fhsfhjsdasldwdfusdfio242345dssdg",
                    "tipo_documento": "id_card",
                    "num_documento": "AB1248CA",
                    "paese": "Italia",
                    "data_rilascio": "2016-12-29",
                    "luogo_rilascio": "Comune di Verona",
                    "data_scadenza": "2022-11-10",
                    "num_telefono": "3486062835",
                    "mail": "alessio.trentin3@gmail.com"
                },
                {
                    "nome": "Giulia",
                    "cognome": "Grotto",
                    "data_nascita": "2000-10-26",
                    "documento": "dfdfgcfghdfgusdfio242345dssdg",
                    "tipo_documento": "id_card",
                    "num_documento": "IQ2448SA",
                    "paese": "Italia",
                    "data_rilascio": "2017-10-25",
                    "luogo_rilascio": "Comune di Vicenza",
                    "data_scadenza": "2022-10-26",
                    "num_telefono": "3432587631",
                    "mail": "giulia.grotto@gmail.com"
                },
                {
                    "nome": "Leonardo",
                    "cognome": "Xillo",
                    "data_nascita": "2000-04-05",
                    "documento": "ghsdfjhfgksdjfg82982jdskrfhjig",
                    "tipo_documento": "id_card",
                    "num_documento": "OH7463DA",
                    "paese": "Italia",
                    "data_rilascio": "2018-03-12",
                    "luogo_rilascio": "Comune di Lusiana-Conco",
                    "data_scadenza": "2023-04-05",
                    "num_telefono": "3849439242",
                    "mail": "leonardo.xillo@gmail.com"
                }
            ],
            "utente": {
                "mail": "giulia.grotto@gmail.com",
                "password": "r89fjfihfi0eri2oprji4r",
                "genere": "F",
                "data_nascita": "2000-10-26"
            },
            "prezzo": 220
        })

        .end((err, res) => {

            if (err) {
                reject(new Error('Error: ' + err))
            }

            assert.error(err, 'No error');
            assert.isEqual("Added Successfully", res.body, "Prenotazione aggiunta correttamente");
            assert.end();
        });
});