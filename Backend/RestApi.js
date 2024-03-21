const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Types } = require("mongoose");
const mongoose = require("mongoose");
const Book = require("./Model/Book");

mongoose
  .connect(
    "mongodb+srv://GadherBhavik:GadherBhavik.Lai@library.0tntmmb.mongodb.net/LibraryCatalog?retryWrites=true&w=majority&appName=Library"
  )
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    app.get("/books", async (req, res) => {
      try {
        const data = await Book.find();
        res.send(data);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    app.get("/book/:bookId", async (req, res) => {
      try {
        const bookId = req.params.bookId;
        const data = await Book.findOne({ BookId: bookId });
        res.status(200).json(data);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    app.post("/book", async (req, res) => {
      try {
        const { Title, Author, Genre, AvailableCopies } = req.body;
        const newBook = new Book({ Title, Author, Genre, AvailableCopies });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.put("/book/:bookId", async (req, res) => {
      try {
        const bookId = req.params.bookId;
        const { Title, Author, Genre, AvailableCopies } = req.body;

        // Find the book by BookId and update its fields
        const updatedBook = await Book.findOneAndUpdate(
          { BookId: bookId },
          { Title, Author, Genre, AvailableCopies },
          { new: true }
        );

        if (!updatedBook) {
          return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(updatedBook);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    app.delete("/book/:bookId", async (req, res) => {
      try {
        const bookId = req.params.bookId;

        // Find the book by BookId and delete it
        const deletedBook = await Book.findOneAndDelete({ BookId: bookId });

        if (!deletedBook) {
          return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(deletedBook);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection to MongoDB failed:", error);
  });
