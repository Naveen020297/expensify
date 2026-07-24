// Migration script to create expenses table in the database
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

const migrate = async () => {
    await Expense.syncIndexes();
    console.log('Migration completed: Expenses table created.');
};

migrate();