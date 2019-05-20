const Validator = require("validator");
const isEmpty = require('is-empty');

module.exports = function validateBudgetInput(data) {
     console.log();
     console.log("Budget validation file");
     console.log(data);
     let errors = {};

     //Convert empty fields to an empty string so we can use validator
     //functions
     
     data.value = !isEmpty(data.value) ? data.value : "";
     console.log(data.value, 'in validate budget')
     console.log(isEmpty(data.value))
     //Value verification

     if (Validator.isEmpty(data.value)) {
          errors.value = "An amount is required";
     } else if (!Validator.isInt(data.value)) {
          errors.value = "Amount must be a number"
     }
     console.log();
     console.log("Coming from  budget validation", errors, isEmpty(errors))
     return {
          errors,
          isValid: isEmpty(errors)
     }
}