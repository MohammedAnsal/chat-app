const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env

const connectDB = async () => {

    try {
      
      const connect = await mongoose.connect(process.env.MONGO_URL);

        console.log(`MongoDB Connected: ${connect.connection.host}`);
        
    } catch (error) {
        
        console.log(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
        
    }
    
};

module.exports = connectDB;
