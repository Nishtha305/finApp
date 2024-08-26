import mongoose from "mongoose";

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE_URL);

const database = mongoose.connection;
database.on('connected', function(){
    console.log('Database is connected successfully');
});

database.on('disconnected', function(){
    console.log('Database is disconnected successfully');
})

database.on('error', console.error.bind(console, "MongoDB connection error:"));

export default database;