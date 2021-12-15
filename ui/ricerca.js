var APP = {
    andata_ritorno: function () {

        var contDataRitorno = document.getElementById("contDataRitorno");
        contDataRitorno.style.display = 'block';
    },

    andata: function () {
        var contDataRitorno = document.getElementById("contDataRitorno");
        contDataRitorno.style.display = 'none';
    },

    init_andataRitorno: function () {
        $("#andataRitorno").on("click", APP.andata_ritorno);
        $("#soloAndata").on("click", APP.andata);
    },

    invia_form: function () {
        var form = document.getElementById('formRicerca');

        var aeroporto_partenza = form.elements['aeroportoPartenza'].value;
        var aeroporto_arrivo = form.elements['aeroportoArrivo'].value;
        var data_partenza = form.elements['dataPartenza'].value;
        var data_ritorno = form.elements['dataRitorno'].value;
        var num_neonati = form.elements['numNeonati'].value;
        var num_bambini = form.elements['numBambini'].value;
        var num_adulti = form.elements['numAdulti'].value;
        var classe = form.elements['classe'].value;

        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status >= 200 && this.status < 400) {

                var voli = JSON.parse(this.responseText);
                document.getElementById("ricercaVoli").style.display = 'none';
                var cont = document.getElementById("risultatiRicerca");


                for (let i = 0; i < voli.length; i++) {
                    var testo = cont.innerHTML;
                    cont.innerHTML = testo + "<a href=\"#\" id=\"volo" + i + "\" class=\"list-group-item list-group-item-action\" aria-current=\"true\"> </a>";

                    var num_passeggeri = num_adulti + num_bambini + num_neonati;
                    var aeroporto_partenza = voli[i].aeroporto_partenza;
                    var aeroporto_arrivo = voli[i].aeroporto_arrivo;
                    var durata = voli[i].durata_volo;
                    var ora_partenza = voli[i].data_ora_partenza;
                    var codice = voli[i].codice;
                    var peso_max_bagaglio = voli[i].peso_max_bagaglio;
                    var compagnia_aerea = voli[i].compagnia_aerea;
                    var volo = document.getElementById("volo" + i);
                    volo.innerHTML = "<div class=\"d-flex w-100 justify-content-between\">" +
                        "<h5 class=\"mb-1\">" + aeroporto_partenza + " - " + aeroporto_arrivo + "</h5>" +
                        "<small>" + durata + " minuti </small> </div>" +
                        "<p class=\"mb-1\">" + ora_partenza + "<br> Peso massimo bagaglio: " + peso_max_bagaglio + "</p>" +
                        "<small>" + compagnia_aerea + " - " + codice + "</small> <br>" +
                        "<a role=\"button\" class=\"btn btn-primary\" href=\"prenota.html?code=" + codice + "&n=" + num_passeggeri + "\">Prenota</a>";
                }


            } else if (this.status > 400) {

                //document.getElementById("error").innerHTML = "Error. The credentials entered are not correct"

            }

        }

        xmlhttp.open("GET", "http://localhost:8080/api/ricercavoli?aeroportoPartenza=" + aeroporto_partenza + "&aeroportoArrivo=" + aeroporto_arrivo
            + "&dataPartenza=" + data_partenza + "&dataRitorno=" + data_ritorno + "&numNeonati=" + num_neonati + "&numBambini=" + num_bambini + "&numAdulti="
            + num_adulti + "&classe=" + classe, true);
        xmlhttp.send();
    },

    init_formSubmit: function () {
        $("#inviaForm").on("click", APP.invia_form);
    }
}

$(document).ready(function () {
    APP.init_formSubmit();
    APP.init_andataRitorno();
});