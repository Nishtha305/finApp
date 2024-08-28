const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/expanses',{
    // useNewUrlParser: true,
    // useUnifiedTopology: true, 
}).then(()=> console.log('Connected to mongoDB'))
.catch(err => console.log(err))

//routes
app.use('/api/auth',require('./routes/auth'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))