require('dotenv').config();
const dns = require('dns');
dns.setServers(['1.1.1.1','8.8.8.8']);//dns public de google et cloudflare pour éviter les problèmes de résolution de noms de domaine qui peuvent survenir avec les serveurs DNS par défaut de l'hébergeur. En utilisant des serveurs DNS publics, tu peux améliorer la fiabilité et la vitesse de résolution des noms de domaine, ce qui peut être particulièrement utile si tu rencontres des problèmes de connectivité ou de performance liés aux DNS.

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo').default; //connect-mongo est une bibliothèque qui permet de stocker les sessions Express.js dans une base de données MongoDB. Cela est particulièrement utile pour les applications qui nécessitent une persistance des sessions, même en cas de redémarrage du serveur. En utilisant connect-mongo, les sessions sont stockées de manière sécurisée dans MongoDB, ce qui permet de maintenir l'état de l'utilisateur entre les différentes requêtes et de gérer les sessions de manière plus efficace.



const app = express();
const PORT = process.env.PORT || 3000; 


app.use(session({
    secret: "Romaric",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
         mongoUrl: process.env.MONGODB_URI
         // Utilise connect-mongo pour stocker les sessions dans MongoDB. Cela permet de conserver les sessions même si le serveur redémarre, contrairement au stockage en mémoire qui perdrait toutes les sessions en cas de redémarrage du serveur.
        }) 
})); //express-session est un middleware pour Express.js qui permet de gérer les sessions utilisateur. Une session est une manière de stocker des données spécifiques à un utilisateur entre les différentes requêtes HTTP. Cela est particulièrement utile pour l'authentification, où tu veux garder une trace de l'utilisateur connecté.

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/', require('./server/routes/auth')); //Toutes les routes dans auth.js deviennent accessibles
app.use('/', require('./server/routes/index')); //app.use() est une méthode d'Express.js qui permet de monter des middleware ou des routes sur une application Express. Dans ce cas, app.use('/', require('./server/routes/index')) signifie que toutes les requêtes HTTP qui commencent par '/' (la racine de l'application) seront dirigées vers le routeur défini dans le fichier './server/routes/index'. Le fichier './server/routes/index' doit exporter un routeur Express qui gère les différentes routes et les actions associées à ces routes. Par exemple, si le routeur dans './server/routes/index' définit une route pour GET '/', alors cette route sera accessible via http://localhost:3000/ et exécutera la logique définie dans ce routeur.
app.use('/', require('./server/routes/dashboard')); //app.use() est une méthode d'Express.js qui permet de monter des middleware ou des routes sur une application Express. Dans ce cas, app.use('/auth', require('./server/routes/auth')) signifie que toutes les requêtes HTTP qui commencent par '/auth' seront dirigées vers le routeur défini dans le fichier './server/routes/auth'. Le fichier './server/routes/auth' doit exporter un routeur Express qui gère les différentes routes et les actions associées à ces routes d'authentification. Par exemple, si le routeur dans './server/routes/auth' définit une route pour GET '/login', alors cette route sera accessible via http://localhost:3000/auth/login et exécutera la logique définie dans ce routeur.



app.use((req, res) => {
    res.status(404).render('404');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});