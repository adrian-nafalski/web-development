const port = 8000;

const express = require("express");
const bodyParser = require("body-parser");
const usersRouters = require("./routes/users.js");
const picturesRoutes = require("./routes/pictures.js");

// moduły potrzebne do generowania widoków
const hbs = require("express-handlebars");
let path = require("path");

// Database logic
require("./db/database.js");
const Picture = require("./models/picture.js");
const mongoose = require("./db/mongoose.js");

require("node-localstorage");

const app = express();

// aby nasze zdjęcia były widoczne należy dodać parametr
app.use(express.static(path.join(__dirname, "public")));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/users", usersRouters);
app.use("/pictures", picturesRoutes);

app.get("/", (req, res) => {
    res.render("welcomePage");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
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

// ustawienie silnika dla layoutu znajdującego się w folderze views/layouts o nazwie layout.hbs
app.engine(
    ".hbs",
    hbs.engine({
        extname: ".hbs",
        defaultLayout: "layout",
        layoutsDir: __dirname + "/views/layouts",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);

app.set("view engine", "hbs");

// Cookie
let token = "12345";

if (typeof localStorage == "undefined" || localStorage === null) {
    let LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
}

localStorage.setItem("token", token);
console.log(localStorage.getItem("token"));

app.listen(port);
