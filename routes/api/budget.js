const express = require("express");
const router = express.Router();

//Load user model
const Budget = require("../../models/Budget");

//Load input validation
const validateBudgetInput = require("../../validation/budget")

router.post("/set-budget", (req, res) => {
     console.log("hello from within api budget.js")
     const {errors, isValid} = validateBudgetInput(req.body);

     if (!isValid) {
          return res.status(400).json(errors);
     }

     Budget.save(req.body).then(budget => res.json(budget)).catch(err => console.log(err));

})