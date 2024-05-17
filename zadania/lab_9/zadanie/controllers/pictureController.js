let Picture = require("../models/picture");

// zdefiniowanie pustych funkcji
exports.index = function (req, res) {
    console.log("wywołanie get index");
    res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.picture_list = function (req, res) {
    let picturesList;

    const getPictures = async () => {
        try {
            picturesList = await Picture.find();
            console.log(picturesList);
            res.send(picturesList);
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

console.log("kontroler gotowy");
