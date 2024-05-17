const port = 8000;

const express = require("express");
const bodyParser = require("body-parser");
const usersRouters = require("./routes/users.js");

// Database logic
require("./db/database.js");

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRouters);

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

app.listen(port);
