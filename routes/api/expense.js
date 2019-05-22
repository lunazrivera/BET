const express = require("express");
const router = express.Router();

//Load user model
const Expense = require("../../models/Expenses");

//Load input validation
const validateExpensesInput = require("../../validation/expenses");

router.post("/create-expense", (req, res) => {
    console.log();
    console.log("Coming from create-expenses");
    console.log(req.body);
    const {errors, isValid} = validateExpensesInput(req.body);
    
    if (!isValid) {
      console.log('coming from if statement inside create-expense', errors)
      return res.json(errors);
    }

    const newExpense = new Expense ({
      userId: req.body.userId,
      category: req.body.category,
      value: parseFloat(req.body.value),
      date: req.body.date,
      description: req.body.description
    });

    Expense.create(newExpense, function(err, newExpense) {
      if (err) console.log(err);
      res.json(newExpense);
    })

});

router.post("/get-value", (req, res) => {
  // console.log();
  // console.log("Coming from get-value");
  // console.log(req.body)
  Expense.find({_id: { $in: req.body }}, function(err, data) {
    // console.log(data);
    res.json(data);
  })
})

router.get("/get-expenses/:id/:category/", (req, res) => {
  Expense.find({userId: req.params.id, category: req.params.category, softDelete: false}, function(err, data) {
    res.json(data);
  });
});

router.post("/delete-expenses", (req, res) => {
  Expense.updateMany({_id: { $in: req.body }},{ $set: { softDelete : true }}, function(err, data) {
    if (err) {console.log(err)}
    res.json(data);
  })
})




module.exports = router;
