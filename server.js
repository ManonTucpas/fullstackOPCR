/*
	on importe le package http via require('http') / require permet de remplacer import 
	ensuite on l'utilise pour creer un server en lui passant la fonction app de app.js 
	qu va recevoir la requete et la reponse
	et qui sera effectue a chaque appel vers ce serveur
*/
const http = require('http');

/* importer l'application creer dans app.js */
const app = require('./app');

/* Permet de remvoyer un port valide qu'il ait ete fourni en int u string */
const normalizePort = val => {
	const port = parseInt(val, 10);
	
	if (isNaN(port)) { 
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};


const port = normalizePort(process.env.PORT || '3000');
/* 	On doit dire a app express sur quel port elle doit tourner */
app.set('port', port)

/* Handle errors */
const errorHandle = error => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	switch (error.code) {
	  case 'EACCES':
		console.error(bind + ' requires elevated privileges.');
		process.exit(1);
		break;
	  case 'EADDRINUSE':
		console.error(bind + ' is already in use.');
		process.exit(1);
		break;
	  default:
		throw error;
	}
  };



const server = http.createServer(app);

/*	un écouteur d'évènements est également enregistré, 
	consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console. */
server.on('error', errorHandle);
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/*  if server.listen(process.env.PORT || 3000)
	ici on config le server pour qu'il ecoute soit sur la variable d'env du port 
	ou soit sur le port 3000 */
server.listen(port);

/* Pour demarrer le server : node server */