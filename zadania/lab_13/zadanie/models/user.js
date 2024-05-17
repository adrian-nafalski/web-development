const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    imie: {
        type: String,
    },
    nazwisko: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
});

const User = mongoose.model("User", UserSchema);
console.log("model gotowy!");
module.exports = User;
