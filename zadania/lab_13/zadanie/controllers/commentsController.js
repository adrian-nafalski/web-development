const Comments = require("../models/comments");

exports.add = function (req, res) {
    const comments = new Comments({
        user: req.body.user,
        tresc: req.body.tresc,
        id_zdjecia: req.body.id_zdjecia,
    });

    comments
        .save()
        .then(() => {
            res.redirect("/pictures/" + comments.id_zdjecia);
        })
        .catch((err) => {
            console.log(err);
        });
};
