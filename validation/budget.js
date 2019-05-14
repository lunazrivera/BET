const Validator = require("validator");
const isEmpty = require('is-empty');

module.exports = function validateBudgetInput(data) {
     let errors = {};

     //Convert empty fields to an empty string so we can use validator
     //functions

     data.value = !isEmpty(data.value) ? data.value : "";

     //Value verification

     if (Validator.isEmpty(data.value)) {
          errors.value = "An amount is required";
     }
     if (!Validator.isInt(data.value)) {
          errors.value = "Amount must be a number"
     }

     return {
          errors,
          isValid: isEmpty(errors)
     }
}