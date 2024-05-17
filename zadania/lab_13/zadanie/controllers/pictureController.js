const Comments = require("../models/comments");
let Picture = require("../models/picture");

// exports.index = function (req, res) {
//     console.log("wywołanie get index");
//     res.send("NOT IMPLEMENTED: Site Home Page");
// };

// // zdefiniowanie pustych funkcji
// exports.index = function (req, res) {
//     console.log("wywołanie get index");
//     res.render("index", {
//         title: "Galeria",
//         parametr: true,
//         tablica: [1, 2, 3],
//         zmienna: 5,
//     });
// };

// zdefiniowanie pustych funkcji
exports.index = function (req, res) {
    Picture.find().then(function (pictures) {
        res.render("index", { title: "Gallery", items: pictures });
    });
};

exports.picture_list = function (req, res) {
    let picturesList;

    const getPictures = async () => {
        try {
            picturesList = await Picture.find();
            console.log(picturesList);
            // res.send(picturesList);
            res.sendFile(__dirname + "/index.html");
        } catch (err) {
            console.log(err);
        }
    };

    getPictures();
};

exports.picture_create_post = function (req, res) {
    const picture = new Picture({
        nazwa: "foto_12",
        sciezka: "./images",
        rozmiar: "2345",
    });
    picture
        .save()
        .then(() => {
            console.log(picture);
            res.send("Add new picture!");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.picture_create_get = function (req, res) {
    res.render("create");
};

exports.picture_create_post = function (req, res) {
    console.log(req.body.rozmiar);

    const picture = new Picture({
        nazwa: req.body.nazwa,
        rozmiar: req.body.rozmiar,
    });

    picture
        .save()
        .then(() => {
            console.log(picture);
            res.render("createShow", { item: req.body, path: "../images/" });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.picture_info = function (req, res) {
    let id = req.params.id;

    Picture.findOne({ _id: id }).then(function (pictures) {
        Comments.find({ id_zdjecia: id }).then(function (comments) {
            res.render("show", { item: pictures, commentsList: comments });
        });
    });
};

exports.picture_update_post = function (req, res) {
    let picture = {};
    picture.nazwa = req.body.nazwa;
    picture.rozmiar = req.body.rozmiar;

    const id = req.params.id;

    Picture.findByIdAndUpdate(id, picture).then(res.redirect("/pictures"));
};

exports.picture_update_get = function (req, res) {
    const id = req.params.id;
    let data;

    Picture.findOne({ _id: id }).then(function (picture) {
        res.render("edit", { item: picture, id: id });
    });
};

exports.picture_delete_post = function (req, res) {
    const id = req.body.id;
    console.log(id);

    Picture.findByIdAndDelete(id).then(() => {
        console.log("Usuwam!");
        res.redirect("/pictures");
    });
};

console.log("kontroler gotowy");
