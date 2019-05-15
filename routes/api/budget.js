const express = require("express");
const router = express.Router();

//Load user model
const Budget = require("../../models/Budget");

//Load input validation
const validateBudgetInput = require("../../validation/budget");

router.post("/set-budget", (req, res) => {
  console.log("hello from within api budget.js");
  const { errors, isValid } = validateBudgetInput(req.body);
  console.log();
  console.log("Below errors");
  console.log(errors);
  console.log("isVaid below");
  console.log(isValid);
  console.log();
  if (!isValid) {
    return res.json(errors);
  }

  const newBudget = {
    userId: req.body.userId,
    category: req.body.category,
    value: req.body.value
  };

  Budget.updateOne(
    { category: req.body.category },
    newBudget,
    { upsert: true },
    function(error, doc) {
      if (error) {
        console.log(error);
        return res.status(500).send({ error: error });
      }
      console.log("Successfully saved!");
    }
  );

  // newBudget.save(req.body).then(budget => res.json(budget)).catch(err => console.log(err));
});

module.exports = router;
