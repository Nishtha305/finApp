const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Expenses', ExpenseSchema);