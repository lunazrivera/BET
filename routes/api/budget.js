const express = require("express");
const router = express.Router();

//Load user model
const Budget = require("../../models/Budget");

//Load input validation
const validateBudgetInput = require("../../validation/budget");

router.post("/set-budget", (req, res) => {

  const { errors, isValid } = validateBudgetInput(req.body);

  if (!isValid) {
    return res.json(errors);
  }

  const newBudget = {
    userId: req.body.userId,
    category: req.body.category,
    value: req.body.value
  };

  Budget.updateOne(
    { category: req.body.category, userId: req.body.userId },
    newBudget,
    { upsert: true },
    function(error, doc) {
      if (error) {
        console.log(error);
        return res.status(500).send({ error: error });
      } else {
        console.log(newBudget, doc);
        return res.json(newBudget)
      }
    }
  );

  // newBudget.save(req.body).then(budget => res.json(budget)).catch(err => console.log(err));
});

router.get("/get-budget/:id/:category", (req, res) => {
  Budget.findOne({userId: req.params.id, category: req.params.category }, function (err, data) {
    res.json(data);
  })
  
})

module.exports = router;
