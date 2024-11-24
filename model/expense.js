const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    Type: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Details: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
