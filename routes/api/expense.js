const express = require("express");
const router = express.Router();

//Load user model
const Expense = require("../../models/Expenses");

router.post("/create-expense", (req, res) => {


     const newExpense = {
       userId: req.body.userId,
       category: req.body.category,
       value: req.body.value,
       date: req.body.date,
       description: req.body.description
     };

     Expense.save

});




module.exports = router;
