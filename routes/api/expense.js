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
