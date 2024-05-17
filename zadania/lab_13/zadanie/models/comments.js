const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    tresc: {
        type: String,
    },
    id_zdjecia: {
        type: String,
    },
});

const Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;
