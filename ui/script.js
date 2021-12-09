var APP = {
    andata_ritorno: function () {

        var contDataRitorno = document.getElementById("contDataRitorno");
        contDataRitorno.style.display = 'block';
    },

    andata: function () {
        var contDataRitorno = document.getElementById("contDataRitorno");
        contDataRitorno.style.display = 'none';
    },

    destinazioni_multiple: function () {
        var contDataRitorno = document.getElementById("contDataRitorno");
        contDataRitorno.style.display = 'none';


        var container = document.getElementById("countDest")
        //container.innerHTML("<")
    },

    init_andataRitorno: function () {
        $("#andataRitorno").on("click", APP.andata_ritorno);
        $("#soloAndata").on("click", APP.andata);
        $("#destinazioniMultiple").on("click", APP.destinazioni_multiple);
    }
}

$(document).ready(function () {

    APP.init_andataRitorno();
    var modal = document.getElementById('modalDest')
    var input = document.getElementById('destinazioniMultiple')

    modal.addEventListener('shown.bs.modal', function () {
        input.focus()
    })
});