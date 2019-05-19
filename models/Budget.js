const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BudgetSchema = new Schema ({
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
          default: Date.now
     },
     cardTotal: {
          type: Number,
     }
});

module.exports = Budget = mongoose.model("budgets", BudgetSchema);