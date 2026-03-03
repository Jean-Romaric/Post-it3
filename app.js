require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 3000;


//app.use() est une méthode fondamentale dans Express.js, utilisée pour monter des middleware dans l'application. Un middleware est une fonction qui a accès à l'objet de requête (req), à l'objet de réponse (res) et à la fonction next() dans le cycle de requête-réponse de l'application. Les middlewares peuvent exécuter du code, modifier les objets de requête et de réponse, terminer le cycle de requête-réponse ou appeler la fonction next() pour passer le contrôle au middleware suivant.
app.use(express.urlencoded({ extended: true })); //express.urlencoded() <=> Permet de lire les données des formulaires envoyées en méthode POST.
                                                //extended: true, Peut lire des objets complexes, Peut lire des tableaux dans le formulaire
app.use(express.json());// lire données JSON

// Stic files
app.use(express.static('public')); //Sert à servir les fichiers statiques dans ton serveur Express.js.   ---- 'public' est un dossier qui contient des fichiers statiques tels que des images, des fichiers CSS, des fichiers JavaScript, etc. Lorsque tu utilises express.static('public'), Express.js va automatiquement servir les fichiers qui se trouvent dans ce dossier lorsque les clients font des requêtes pour ces ressources. Par exemple, si tu as un fichier image nommé "logo.png" dans le dossier "public", il sera accessible via l'URL http://localhost:3000/logo.png.----

//Templating engine
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Définit le layout par défaut pour toutes les vues. Cela signifie que toutes les vues rendues utiliseront ce layout à moins qu'un autre layout ne soit spécifié dans la vue elle-même.
app.set('view engine', 'ejs');// Définit le moteur de rendu des vues sur EJS (Embedded JavaScript). Cela permet à l'application de rendre des fichiers .ejs comme des vues HTML dynamiques.

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' }); //index.ejs est la vue qui sera rendue lorsque l'utilisateur accède à la route racine ("/"). Le deuxième argument { title: 'Home' } est un objet qui contient des données que tu peux utiliser dans ta vue EJS. Dans ce cas, tu passes une variable title avec la valeur 'Home' à la vue index.ejs, ce qui te permet d'afficher dynamiquement le titre de la page dans ton template EJS.
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});