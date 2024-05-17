const mongoose = require("mongoose");

// const Picture = mongoose.model("Picture", {
//     nazwa: String,
//     sciezka: String,
//     rozmiar: Number,
// });

// korzystając z obiektu Schema udostępnionym przez mongoose, można dodać dodatkowe parametry
// takie jak wymagane pola czy różne ograniczenia i elementy domyślne
const PictureSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true,
    },
    sciezka: {
        type: String,
        default: "./images",
    },
    rozmiar: {
        type: Number,
        max: 10000,
    },
});

// dopiero tutaj tworzony jest model
const Picture = mongoose.model("Picture", PictureSchema);

module.exports = Picture;
