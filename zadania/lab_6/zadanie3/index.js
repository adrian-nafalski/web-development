const express = require('express');
const port = 8000;
const bodyParser = require('body-parser');

const usersRouters = require('./routes/users.js');

const app = express();

app.use(bodyParser.json());

app.use('/users', usersRouters);

// app.set('view engine', 'html');

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.set("view engine", "hbs");
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index', {
        Title: "Galeria",
        Body: "Zdjęcia"
    });
});

app.get("/users", (req, res) => {
    res.send("użytkownicy");
});

app.get("/comments", (req, res) => {
    res.send("komentarze");
});

app.listen(port);
