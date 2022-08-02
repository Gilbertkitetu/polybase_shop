const mongoose = require('mongoose');




const dotenv = require('dotenv'); //setting up config file

dotenv.config(); //import config.env file



const dbUrl = process.env.DB;

const connectDatabase = () => {
    const db = process.env.DB;    
    
    mongoose.connect("mongodb+srv://gilbertkitetu:Munywoki1@polybase.xpa8qil.mongodb.net/?retryWrites=true&w=majority", {
          useNewUrlParser: true,
          useUnifiedTopology:true,
          useCreateIndex: true
        }).then(()=>{
          console.log("conected to mongodb");
        }).catch(error => {
          console.log("mongo error",error);
        })
    
}


module.exports = connectDatabase;