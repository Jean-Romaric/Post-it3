exports.dashboard = async (req, res) => {
    const locals = {
        title: 'Dashboard',
        description: 'Welcome to the Dashboard'
    }
    res.render('dashboard/index',
        {
            locals,
            layout: '../views/layouts/dashboard' //Ça indique quel fichier layout utiliser pour afficher la page.
        } );
}