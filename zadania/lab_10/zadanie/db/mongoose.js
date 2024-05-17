// Mongoose
const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017";
const dbName = "galleryDB";

mongoose.connect(uri + "/" + dbName, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
});
