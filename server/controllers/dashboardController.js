const Note = require('../models/Notes');
const mongoose = require('mongoose');

exports.dashboard = async (req, res) => {

    console.log(req.user);

    let perPage = 8;
    let page = req.query.page || 1;

    const locals = {
        title: 'Dashboard',
        description: 'Welcome to the Dashboard'
    };

    try {

        const notes = await Note.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $project: {
                    title: { $substr: ["$title", 0, 30] },
                    body: { $substr: ["$body", 0, 100] },
                    createdAt: 1
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage);

        // compter toutes les notes de cet utilisateur
        const count = await Note.countDocuments({
            user: req.user._id
        });

        console.log(notes);

        res.render('dashboard/index', {
            userName: req.user.firstName,
            locals,
            notes,
            layout: '../views/layouts/dashboard',
            current: page,
            pages: Math.ceil(count / perPage)
        });

    } catch (err) {

        console.log(err);
        res.status(500).send('Server Error');

    }

};


// voir une note
exports.dashboardViewNote = async (req, res) => {
    const note = await Note.findById({_id: req.params.id})
    .where({user: req.user.id }).lean();
    
    if(note){
        res.render('dashboard/view-note', {
            noteID: req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    } else {
        res.send('Quelque a mal tourné');
    }
};
exports.dashboardUpdateNote = async (req, res) => {

};