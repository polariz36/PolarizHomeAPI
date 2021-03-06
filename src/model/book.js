/**
 * Adapted from Samuele Zaza https://scotch.io
 * Authors: Brian Thompson
 * Last edited: 8/15/08
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Book schema definition
let BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, required: true, min: 1 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
  now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

// Exports the BookSchema for use elsewhere
module.exports = mongoose.model('book', BookSchema);