const Validator = require("validator");
const isEmpty = require('is-empty');

module.exports = function validateExpenseInput(data) {
     let errors = {};

     data.description = !isEmpty(data.description) ? data.description : "";
     data.value = !isEmpty(data.value) ? data.value : "";
     data.date = !isEmpty(data.date) ? data.date : "";

     if (Validator.isEmpty(data.description)) {
         
          errors.description = "A description is required";
     } else if (Validator.isInt(data.description)) {
          
          errors.description = "Description can't be a number";
     }

     if (Validator.isEmpty(data.value)) {
          
          errors.value = "An amount is required";
     } else if (!Validator.isInt(data.value)) {
         
          errors.value = "Amount must be a number";
     }
 
     if (Validator.isEmpty(data.date)) {
          errors.date = "Must add a valid date"
     }

     return {
          errors,
          isValid: isEmpty(errors)
     };
}