    const mongoose = require('mongoose');
    require('dotenv').config();
    mongoose.set('strictQuery', true); //Cette ligne configure le comportement des requêtes.
                                    //N’accepte que les champs connus dans les requêtes.
    const connectDB = async () => {
    try {       
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`); 
    }catch (error) {
        console.log(error);
        process.exit(1);
     }  
    }; 
    module.exports = connectDB;  
    