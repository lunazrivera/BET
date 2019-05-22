const express = require("express");
const router = express.Router();

//Load user model
const Budget = require("../../models/Budget");

//Load input validation
const validateBudgetInput = require("../../validation/budget");

router.post("/save-cardtotal", (req,res) => {
    const newCardTotal = {
      cardTotal: req.body.cardTotal
    };
    // console.log();
    // console.log("Coming from save Card Total")
    // console.log(newCardTotal)
    Budget.updateOne(
      { category: req.body.category, userId: req.body.userId },
      newCardTotal,
      { upsert: true },
      function(error, doc) {
        if (error) {
          console.log(error);
          return res.status(500).send({ error: error });
        } else {
          console.log(newCardTotal, doc);
          return res.json(newCardTotal);
        }
      }
    );

});

router.post("/set-budget", (req, res) => {
  const {errors, isValid} = validateBudgetInput(req.body);
  // console.log();
  // console.log("Coming from set-budget, corroborating errors and isValid");
  // console.log(errors, isValid);

  if (!isValid) {
    // console.log('coming from if statement', errors);
    return res.json(errors);
  }
  
  const newBudget = {
    userId: req.body.userId,
    category: req.body.category,
    value: parseFloat(req.body.value)
  };
  // console.log();
  // console.log("Coming from set budget");
  // console.log(newBudget);
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
  
});

module.exports = router;
