const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
  copiesAvailable: { type: Number, required: true },
  totalCopies: { type: Number, required: true },
  shelfLocation: { type: String },
  authorName: { type: String },
}, {
  timestamps: false,
  versionKey: false,
});


bookSchema.pre("save", function (next) {
  if (this.copiesAvailable > this.totalCopies) {
    return next(new Error("Available copies cannot exceed total copies"));
  }
  next();
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;
