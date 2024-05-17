const port = 8000;

const express = require("express");
const bodyParser = require("body-parser");
const usersRouters = require("./routes/users.js");
const picturesRoutes = require("./routes/pictures.js");

// Database logic
require("./db/database.js");
const Picture = require("./models/picture.js");
const mongoose = require("./db/mongoose.js");

const app = express();

app.use(bodyParser.json());
app.use("/users", usersRouters);
app.use("/pictures", picturesRoutes);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index", {
        Title: "Galeria",
        Body: "Zdjęcia",
    });
});

app.get("/users", (req, res) => {
    res.send("użytkownicy");
});

app.get("/comments", (req, res) => {
    res.send("komentarze");
});

/*
    Praca z Mongoose
*/
// // Utworzenie obiektu zdjęcia i zapisanie go do bazy danych
// const picture = new Picture({
//     nazwa: "foto_01",
//     sciezka: "./images",
//     rozmiar: "2345",
// });

// picture
//     .save()
//     .then(() => {
//         console.log(picture);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// const getPictures = async () => {
//     try {
//         const pictures = await Picture.find();
//         console.log(pictures);
//     } catch (error) {
//         console.log(error);
//     }
// }

// getPictures();

/*
    Find picture
*/

// Picture.find({})
//     .then((getPictures) => {
//         console.log(getPictures);
//     })
//     .catch((err) => console.log(err));

// Picture.find({
//     rozmiar: { $gt: 2345 },
// }).then((getPictures) => {
//     console.log(getPictures);
// });

// // Update picture
// Picture.updateOne(
//     { nazwa: "foto_01" },
//     {
//         $set: {
//             rozmiar: 5345,
//         },
//     }
// ).then((pictures) => {
//     console.log(pictures);
// });

// const addPicture = async (pictureData) => {
//     try {
//         const picture = new Picture(pictureData);
//         picture.save();
//         console.log(picture);
//     } catch (err) {
//         console.log(err);
//     }
// };

// addPicture({
//     nazwa: "foto_03",
//     rozmiar: 4567,
// });

app.listen(port);
