const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expense');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(express.json());

const PORT = process.env.PORT || 5000;

//routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/expenses', expenseRoutes)

//Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/expense_manager',{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
}).then(()=> console.log('Connected to mongoDB'))
.catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))