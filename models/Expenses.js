const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema ({
     userId: {
          type: String,
          required: true
     },
     category: {
          type: String,
          required: true
     },
     value: {
          type: Number,
          required: true
     },
     date: {
          type: Date,
          default: Date.now,
     },
     description: {
          type: String,
          required: true
     },
     softDelete: {
          type: Boolean,
          default: false,
          required: true,
     }
});

module.exports = Expenses = mongoose.model("expenses", ExpensesSchema);