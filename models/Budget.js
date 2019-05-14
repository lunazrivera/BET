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
     }
});

module.exports = Budget = mongoose.model("Budget", BudgetSchema);