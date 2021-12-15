# BlueSky
BlueSky è un'applicazione che permette la prenotazione di biglietti aerei. Il meccanismo parte da una ricerca dei voli effettuata dall'utente inserendo l'aeroporto di partenza e di arrivo, la data dell'andata ed eventualmente quella del ritorno, il numero di passeggeri (adulti, bambini, neonati) e la classe di viaggio. L'applicazione risponderà con una lista di voli che corrisponde alla ricerca effettuata, da cui sarà possibile selezionare un volo e prenotarlo. Durante la prenotazione verranno richieste le informazioni personali e il documento di riconscimento dei passeggeri che saliranno a bordo. Una volta inseriti, le informazioni verranno inviate al server e salvate nel database.

## Guida all'uso
Per utilizzare l'applicazione è necessario:
- aver installato [Node.js](https://nodejs.org/it/);
- avviare il server, recandosi nella cartella `BlueSky/api/` da terminale e digitando `npm start` o `node index.js`;
- aprire il file `BlueSky/ui/index.html` con un browser qualsiasi.
