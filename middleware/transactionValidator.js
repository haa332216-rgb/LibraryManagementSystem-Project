const { body } = require("express-validator");

const validateTransaction = [
  body("userId").notEmpty().withMessage("User is required"),

  body("bookId").notEmpty().withMessage("Book is required"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("Due date must be a valid date (YYYY-MM-DD)"),

  // Optional for update
  body("status")
    .optional()
    .isIn(["Issued", "Returned"])
    .withMessage("Status must be either 'Issued' or 'Returned'"),
];

module.exports = validateTransaction;
