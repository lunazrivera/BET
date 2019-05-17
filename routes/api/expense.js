const express = require("express");
const router = express.Router();

//Load user model
const Expense = require("../../models/Expenses");

router.post("/create-expense", (req, res) => {


     const newExpense = new Expense ({
       userId: req.body.userId,
       category: req.body.category,
       value: req.body.value,
       date: req.body.date,
       description: req.body.description
     });

     Expense.create(newExpense, function(err, newExpense) {
       if (err) console.log(err);
       res.json(newExpense);
     })

});




module.exports = router;
