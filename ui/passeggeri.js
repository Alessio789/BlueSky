var APP = {
    show_passeggeri: function () {

        //var utente = sessionStorage.getItem("mail"); se fosse implementato login lato server
        var utente = "alessio.trentin3@gmail.com"
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {

            if (this.readyState === 4 && this.status >= 200 && this.status < 400) {

                var listaPasseggeri = JSON.parse(this.responseText);
                var cont = document.getElementById("contPasseggeri");


                for (let i = 0; i < listaPasseggeri.length; i++) {
                    var testo = cont.innerHTML;
                    cont.innerHTML = testo + "<a href=\"#\" id=\"passeggero" + i + "\" class=\"list-group-item list-group-item-action\" aria-current=\"true\"> </a>";

                    var nome = listaPasseggeri[i].nome;
                    var cognome = listaPasseggeri[i].cognome;
                    var data_nascita = listaPasseggeri[i].data_nascita;
                    var mail = listaPasseggeri[i].mail;
                    var passeggero = document.getElementById("passeggero" + i);
                    var contenuto = passeggero.innerHTML;
                    passeggero.innerHTML = contenuto + "<div class=\"d-flex w-100 justify-content-between\">" +
                        "<h5 class=\"mb-1\">" + nome + " " + cognome + "</h5>" +
                        "</div>" +
                        "<p class=\"mb-1\">" + data_nascita + "</p>" +
                        "<small>" + mail + "</small> <br>";

                }

            } else if (this.status > 400) {

                //document.getElementById("error").innerHTML = "Error. The credentials entered are not correct"

            }
        }
        xmlhttp.open("GET", "http://localhost:8080/api/passeggeri?utente=" + utente, true);
        xmlhttp.send();
    }
}

$(document).ready(function () {
    APP.show_passeggeri();
});