var APP = {
    show_prenotazioni: function() {

        //var utente = sessionStorage.getItem("mail"); se fosse implementato login lato server
        var utente = "alessio.trentin3@gmail.com"
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status >= 200 && this.status < 400) {

                var listaPrenotazioni = JSON.parse(this.responseText);
                var cont = document.getElementById("contPrenotazioni");
                

                for (let i = 0; i < listaPrenotazioni.length; i++) {
                    var testo = cont.innerHTML;
                    cont.innerHTML = testo + "<a href=\"#\" id=\"volo" + i + "\" class=\"list-group-item list-group-item-action\" aria-current=\"true\"> </a>";
                    var voli = listaPrenotazioni[i].voli;

                    for (let j = 0; j < voli.length; j++) {

                        var aeroporto_partenza = voli[j].aeroporto_partenza;
                        var aeroporto_arrivo = voli[j].aeroporto_arrivo;
                        var durata = voli[j].durata_volo;
                        var ora_partenza = voli[j].data_ora_partenza;
                        var codice = voli[j].codice;
                        var prenotazione = document.getElementById("volo" + i);
                        var contenuto = prenotazione.innerHTML;
                        prenotazione.innerHTML = contenuto + "<div class=\"d-flex w-100 justify-content-between\">" +
                        "<h5 class=\"mb-1\">" + aeroporto_partenza + " - " + aeroporto_arrivo + "</h5>" +
                        "<small>" + durata + "</small> </div>" + 
                        "<p class=\"mb-1\">" + ora_partenza + "</p>" + 
                        "<small>" + codice + "</small> <br>";
                    }
                }

            } else if (this.status > 400) {

                //document.getElementById("error").innerHTML = "Error. The credentials entered are not correct"

            }
        }
        xmlhttp.open("GET", "http://localhost:8080/api/prenotazioni?utente=" + utente, true);
        xmlhttp.send();
    }
}

$(document).ready(function () {
    APP.show_prenotazioni();
});