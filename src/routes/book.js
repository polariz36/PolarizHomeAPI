/**
 * Adapted from Samuele Zaza https://scotch.io
 * Authors: Brian Thompson
 * Last edited: 8/15/08
 */

let mongoose = require('mongoose');
let Book = require('../model/book');

/**
 * GET /book route to retrieve all the books.
 */
function getBooks(req, res) {
  // Query the db and if no errors, send all the books
  let query = Book.find({});
  query.exec((err, books) => {
    if (err) {
      res.send(err);
    }
    res.json(books);
  });
}

/**
 * POST /book to save a new book.
 */
function postBook(req, res) {
  // Creates a new book
  var newBook = new Book(req.body);
  // Save it into the db
  newBook.save((err, book) => {
    if (err) {
      res.send(err);
    } else {
      // If no errors, send it back to the client
      res.json({message: 'Book successfully added!', book});
    }
  });
}

/**
 * GET /book/:id route to retrieve a book given its id.
 */
function getBook(req, res) {
  Book.findById(req.params.id, (err, book) => {
    if (err) {
      res.send(err);
    }
    res.json(book);
  });
}

/**
 * DELETE /book/:id to delete a book given its id.
 */
function deleteBook(req, res) {
  Book.remove({_id: req.params.id}, (err, result) => {
    res.json({message: 'Book successfully deleted!', result});
  });
}

/**
 * PUT /book/:id to update a book given its id.
 */
function updateBook(req, res) {
  Book.findById({_id: req.params.id}, (err, book) => {
    if (err) {
      res.send(err);
    }
    Object.assign(book, req.body).save((err, book) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Book updated!', book});
    });
  });
}

// Export all the functions
module.exports = { getBook, postBook, getBooks, deleteBook, updateBook };
