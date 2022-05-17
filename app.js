/* for DB */
const mongoose = require('mongoose');

/* Pour importer express */
const express = require('express');


/* Appel de la methode express pour creer une application express */
const app = express();


mongoose.connect('mongodb+srv://admin:sQIltwr7Bmi4WrdC@cluster0.pr4k9.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


/*  Interprete toutes les requetes qui ont un content-type json
    et mets a disposidtion le contenue dans la requete : req.body
    -> donne acces au corps de la requete
    il y a aussi boyParserqui ait le meme chose
*/
app.use(express.json());

/* on ajoute les headers sur l'objet reponse pour permettre au 2 app(back et front) de communiquer entre elles */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  /* Icic'est le middleware pour les requetes post
    on a cces a req.body grace a express.json 
    il faut forcement envoyer un repnse sinon la requete ne va pas marcher cote user*/
app.post('/api/stuff/', (req,res,next) => {

    //ici on recup les infos du body du front
    console.log(req.body);
    res.status(201).json({
        message: 'Objet cree'
    });
});

/* /api/stuff c'est la route vise par l'application : route ou endpoint
    le frontend va faire une requete a cette URL
    app.use intercepte toutes les requetes, du coupon change pour avoir un post et un get  
    avec ce middleware on veut que les requetes get*/
app.get('/api/stuff', (req, res, next) => {

    const stuff = [
        {
          _id: 'oeihfzeoi',
          title: 'Mon premier objet',
          description: 'Les infos de mon premier objet',
          imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
          price: 4900,
          userId: 'qsomihvqios',
        },
        {
          _id: 'oeihfzeomoihi',
          title: 'Mon deuxième objet',
          description: 'Les infos de mon deuxième objet',
          imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
          price: 2900,
          userId: 'qsomihvqios',
        },
      ];
    // middleware attribut 200 : reponse ok et renvoie en json le tab stuff
    res.status(200).json(stuff);

})


/* Export de l'application pour y avoir acces depuis server node */
module.exports = app;




/*********************************************************************
**************  EXPLICATIONS STEP BY STEP   **************************
**********************************************************************  

    L'application va utiliser cette fonction pour tout type de requete
    si on veut effectuer une requete a notre serveur on doit recuperer un objet JSON
    qui contiendra le message specifie
    req: objet requete
    res: objet reponse
    next: fonction qui permet de renvoyer a la prochaine fonction l'execution du serveur 
    Ces focntions app.use() sont des MIDDLEWARE: 
    chaque element de middleware recoit les obj req/res et les traite 
    app.use((req, res, next) => {
        console.log("Requete recue !");
        next();
    });
    
    app.use((req, res, next) => {
    
        res.status(201);
        next();
    });
    
    app.use((req, res, next) => {
        res.json({message: 'Votre requete a bien ete recu'});
        next();
    });
    
    app.use((req, res, next) =>{
        console.log('Reponse envoye avec succes');
    });*/