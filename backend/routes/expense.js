const express = require('express');
const Expense = require('../Models/Expense');
const router = express.Router();

router.post('/', async(req,res)=>{
    try {
        const {category, amount, date} = req.body;
        const newExpense = new Expense({category, amount, date});
        await newExpense.save();
        res.status(201).json(newExpense)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.get('/', async(req, res)=>{
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;