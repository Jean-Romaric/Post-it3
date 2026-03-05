// Get Homepage
exports.homepage = async (req, res) => {
    const locals = {
        title: 'Home',
        description: 'Welcome to the Post-it App'
    }
    res.render('index', locals);
}

exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'Welcome to the Post-it App'
    }
    res.render('about', locals);
} 