var APP = {

    show_form_prenotazione : function() {

        const urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get("code");
        var num_passeggeri = urlParams.get("n");

        var cont = document.getElementById("formPrenotazione");
        cont.innerHTML = "<p class=\"h1\">Prenotazione Volo " + code + "</p> <br>";

        for (let i = 0; i < num_passeggeri; i++) {
            var testo = cont.innerHTML;
            cont.innerHTML = testo + "<input class=\"form-control\" type=\"text\" id=\"nome" + i + "\" placeholder=\"Nome\" aria-label=\"default input example\">" + 
            "<input class=\"form-control\" type=\"text\" id=\"cognome" + i + "\" placeholder=\"Cognome\" aria-label=\"default input example\">" +
            "<label class=\"form-check-label\" for=\"dataNascita" + i + "\">Data di nascita</label><input class=\"form-control\" type=\"date\" id=\"dataNascita" + i + "\" aria-label=\"default input example\"></input>" +
            "<select class=\"form-select form-select-md mb-3\" aria-label=\".form-select-lg example\" id=\"tipoDocumento" + i + "\">" +
            "<option selected>ID Card</option> <option value=\"Passaporto\">Passaporto</option><option value=\"Patente\">Patente</option>" +
            "</select>" +
            "<input class=\"form-control\" type=\"text\" id=\"numDocumento" + i + "\" placeholder=\"numDocumento\" aria-label=\"default input example\">" +
            "<input class=\"form-control\" type=\"text\" id=\"paese" + i + "\" placeholder=\"Paese di rilascio\" aria-label=\"default input example\">" +
            "<label class=\"form-check-label\" for=\"dataRilascio" + i + "\">Data di rilascio</label><input class=\"form-control\" type=\"date\" id=\"dataRilascio" + i + "\" aria-label=\"default input example\"></input>" +
            "<input class=\"form-control\" type=\"text\" id=\"luogoRilascio" + i + "\" placeholder=\"Luogo di rilascio\" aria-label=\"default input example\">" +
            "<label class=\"form-check-label\" for=\"dataScadenza" + i + "\">Data di scadenza</label><input class=\"form-control\" type=\"date\" id=\"dataScadenza" + i + "\" aria-label=\"default input example\"></input>" +
            "<input class=\"form-control\" type=\"text\" id=\"numeroTelefono" + i + "\" placeholder=\"Numero di telefono\" aria-label=\"default input example\">" +
            "<input class=\"form-control\" type=\"text\" id=\"mail" + i + "\" placeholder=\"E-mail\" aria-label=\"default input example\">" +
            "<div class=\"input-group mb-3\"> <input type=\"file\" class=\"form-control\" id=\"documento" + i + "\"><label class=\"input-group-text\" for=\"documento" + i + "\">Upload</label></div> <br> <hr> <br>"
        }

        var contenuto = cont.innerHTML;
        cont.innerHTML = contenuto +  "<button type=\"button\" id=\"inviaForm\" class=\"btn btn-primary\">Prenota</button>";
        $("#inviaForm").on("click", APP.invia_form);
    },

    invia_form : function() {
        var form = document.getElementById('formPrenotazione');

        const urlParams = new URLSearchParams(window.location.search);
        var code = urlParams.get("code");
        var num_passeggeri = urlParams.get("n");

        var passeggeri = [];
        for (let i = 0; i < num_passeggeri; i++) {
            var passeggero = {
                    "nome": form.elements['nome' + i].value,
                    "cognome": form.elements['cognome' + i].value,
                    "data_nascita": form.elements['dataNascita' + i].value,
                    "documento": "fhsfhjsdasldwdfusdfio242345dssdg",
                    "tipo_documento": form.elements['tipoDocumento' + i].value,
                    "num_documento": form.elements['numDocumento' + i].value,
                    "paese": form.elements['paese' + i].value,
                    "data_rilascio": form.elements['dataRilascio' + i].value,
                    "luogo_rilascio": form.elements['luogoRilascio' + i].value,
                    "data_scadenza": form.elements['dataNascita' + i].value,
                    "num_telefono": form.elements['numeroTelefono' + i].value,
                    "mail": form.elements['mail' + i].value
            }
            passeggeri.push(passeggero);
        }

        var data = JSON.stringify({
            "voli": [
                {
                    "codice": code
                }
            ],
            "passeggeri": passeggeri,
            "utente": {
                "mail": "alessio.trentin3@gmail.com",
                "password": "r89fjfihfi0eri2oprji4r",
                "genere": "M",
                "data_nascita": "2001-11-10"
            },
            "prezzo" : 230
        });

        if (window.XMLHttpRequest) {

            xmlhttp = new XMLHttpRequest();

        } else {

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.open('POST', "http://localhost:8080/api/prenotazione", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");

        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status === 201) {

                form.style.display = 'none';
                document.getElementById("pEffettuata").innerHTML = "<br> <p class=\"h1\">Prenotazione effettuata! </p>";

            }
        }

        xmlhttp.send(data);
    }

}

$(document).ready(function () {
    APP.show_form_prenotazione();
});