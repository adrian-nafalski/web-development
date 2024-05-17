const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let plik = new Schema({
    nazwa: String,
    waga: Number,
    Administrator: Boolean
});

const model = mongoose.model("pliki", plik);

module.exports = model;
