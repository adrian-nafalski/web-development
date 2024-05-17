let User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, PasswordHash) {
        if (err) {
            res.json({
                error: "błąd funkcji haszującej",
            });
        }

        // tworzenie obiektu użytkownika
        let user = new User({
            imie: req.body.imie,
            email: req.body.email,
            nazwisko: req.body.nazwisko,
            password: PasswordHash,
        });

        user.save()
            .then(() => {
                // res.json({
                //     message: "dodano użytkownika",
                // });
                console.log("Dodano użytkownika!");
                res.redirect("/..");
            })
            .catch(() => {
                res.json({
                    message: "błąd",
                });
            });
    });
};

exports.login = (req, res, next) => {
    const nazwisko = req.body.nazwisko;
    const password = req.body.password;

    User.findOne({ nazwisko }) // login jako nazwisko
        .then((user) => {
            if (user) {
                // porównujemy hasło podane w logowaniu z hasłem użytkownika
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err,
                        });
                    }
                    if (result) {
                        // tworzymy token, gdzie 'kodSzyfrujacy' to tajny kod na podstawie, którego
                        // generowany jest hash, będzie on potrzebny do sprawdzenia tokena później
                        let token = jwt.sign(
                            { imie: user.imie },
                            "kodSzyfrujacy",
                            { expiresIn: "1h" }
                        );
                        // res.json({
                        //     message: "Zalogowano",
                        //     token: token,
                        // });
                        res.redirect("/../pictures");
                    } else {
                        res.json({
                            message: "Złe hasło!",
                        });
                    }
                });
            } else {
                res.json({
                    message: "Nie znaleziono użytkownika!",
                });
            }
        });
};
