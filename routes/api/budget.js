const express = require("express");
const router = express.Router();

const Budget = require("../../models/Budget");

router.post("/set-budget", (req, res) => {
     
     Budget.save(req.body).then(budget => res.json(budget)).catch(err => console.log(err));
})