require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

console.log("damage controbbjkmjkjkfdc l");
const app = express();
const PORT = process.env.PORT || 3000; 

//app.use() permet d’ajouter une fonction qui s’exécute pour toutes les requêtes qui arrivent sur le serveur.
//app.use() est une méthode fondamentale dans Express.js, utilisée pour monter des middleware dans l'application. Un middleware est une fonction qui a accès à l'objet de requête (req), à l'objet de réponse (res) et à la fonction next() dans le cycle de requête-réponse de l'application. Les middlewares peuvent exécuter du code, modifier les objets de requête et de réponse, terminer le cycle de requête-réponse ou appeler la fonction next() pour passer le contrôle au middleware suivant.
app.use(express.urlencoded({ extended: true })); //express.urlencoded() <=> Permet de lire les données des formulaires envoyées en méthode POST.
                                                //extended: true, Peut lire des objets complexes, Peut lire des tableaux dans le formulaire
app.use(express.json());// Pour chaque requête qui contient du JSON, transforme ce JSON en objet JavaScript.

// connect to database
connectDB();


// Static files
app.use(express.static('public')); //Sert à servir les fichiers statiques dans ton serveur Express.js.   ---- 'public' est un dossier qui contient des fichiers statiques tels que des images, des fichiers CSS, des fichiers JavaScript, etc. Lorsque tu utilises express.static('public'), Express.js va automatiquement servir les fichiers qui se trouvent dans ce dossier lorsque les clients font des requêtes pour ces ressources. Par exemple, si tu as un fichier image nommé "logo.png" dans le dossier "public", il sera accessible via l'URL http://localhost:3000/logo.png.----

//Templating engine
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Définit le layout par défaut pour toutes les vues. Cela signifie que toutes les vues rendues utiliseront ce layout à moins qu'un autre layout ne soit spécifié dans la vue elle-même.
app.set('view engine', 'ejs');// Définit le moteur de rendu des vues sur EJS (Embedded JavaScript). Cela permet à l'application de rendre des fichiers .ejs comme des vues HTML dynamiques.

/*app.get('/', (req, res) => {
    const locals = {
        title: 'Home',
        description: 'Welcome to the Post-it App'
    }
    res.render('index', locals);
});
*/
 

//Routes
app.use('/', require('./server/routes/index')); //app.use() est une méthode d'Express.js qui permet de monter des middleware ou des routes sur une application Express. Dans ce cas, app.use('/', require('./server/routes/index')) signifie que toutes les requêtes HTTP qui commencent par '/' (la racine de l'application) seront dirigées vers le routeur défini dans le fichier './server/routes/index'. Le fichier './server/routes/index' doit exporter un routeur Express qui gère les différentes routes et les actions associées à ces routes. Par exemple, si le routeur dans './server/routes/index' définit une route pour GET '/', alors cette route sera accessible via http://localhost:3000/ et exécutera la logique définie dans ce routeur.
app.use('/', require('./server/routes/dashboard')); //app.use() est une méthode d'Express.js qui permet de monter des middleware ou des routes sur une application Express. Dans ce cas, app.use('/auth', require('./server/routes/auth')) signifie que toutes les requêtes HTTP qui commencent par '/auth' seront dirigées vers le routeur défini dans le fichier './server/routes/auth'. Le fichier './server/routes/auth' doit exporter un routeur Express qui gère les différentes routes et les actions associées à ces routes d'authentification. Par exemple, si le routeur dans './server/routes/auth' définit une route pour GET '/login', alors cette route sera accessible via http://localhost:3000/auth/login et exécutera la logique définie dans ce routeur.



app.use((req, res) => {
    res.status(404).render('404');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});