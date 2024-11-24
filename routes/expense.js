
var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Expense = require('../model/expense');  


router.get('/', async (req, res, next) => {
    try {
        const expenseList = await Expense.find();
        res.render('expense', {
            title: 'Assignment Tracker',
            expenseList: expenseList
        });
    } catch (err) {
        console.error(err);
        res.render('expense', { error: 'Error on the Server' });
    }
});


router.get('/add', async (req, res, next) => {
    try {
        res.render('add', { title: 'Add Assignment/Test' });
    } catch (err) {
        console.error(err);
        res.render('expense', { error: 'Error on the server' });
    }
});


router.post('/add', async (req, res, next) => {
    try {
        let newExpense = new Expense({
            Type: req.body.Type,
            Category: req.body.Category,
            Details: req.body.Details,
            Amount: req.body.Amount
        });
        await newExpense.save();  
        res.redirect('/expenseList');
    } catch (err) {
        console.error(err);
        res.render('expense', { error: 'Error on the server' });
    }
});


router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const expenseToEdit = await Expense.findById(id);  
        res.render('edit', { title: 'Edit Assignment/Test', Expense: expenseToEdit });
    } catch (err) {
        console.error(err);
        next(err); 
    }
});


router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedExpense = {
            Type: req.body.Type,
            Category: req.body.Category,
            Details: req.body.Details,
            Amount: req.body.Amount
        };
        await Expense.findByIdAndUpdate(id, updatedExpense);
        res.redirect('/expenseList'); 
    } catch (err) {
        console.error(err);
        res.render('expense', { error: 'Error on the server' });
    }
});


router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Expense.deleteOne({ _id: id });
        res.redirect('/expenseList');
    } catch (err) {
        console.error(err);
        res.render('expense', { error: 'Error on the server' });
    }
});

module.exports = router;
