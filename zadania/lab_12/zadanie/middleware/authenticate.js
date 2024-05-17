const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = jwt.verify(token, "kodSzyfrujacy");

        req.user = decode;
        next();
    } catch (err) {
        // res.json({
        //     message: "Brak dostępu!",
        // });
        
        res.render("accessInfo");
    }
};

module.exports = authenticate;
