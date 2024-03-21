const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a separate counter schema for auto-incrementing BookId
const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

// Create a counter model
const Counter = mongoose.model("Counter", counterSchema);

// Define your book schema
const schema = Schema(
  {
    BookId: { type: Number, unique: true }, // BookId will be auto-incremented
    Title: String,
    Author: String,
    Genre: Number,
    AvailableCopies: Number,
  },
  { versionKey: false }
);

// Middleware to auto-increment BookId before saving
schema.pre("save", function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { _id: "bookId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then(function (counter) {
      doc.BookId = counter.seq;
      next();
    })
    .catch(function (error) {
      return next(error);
    });
});

const Book = mongoose.model("Book", schema);

module.exports = Book;
