const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Witam Node i Express!'));

app.listen(port, () => console.log(`Aplikacja uruchomiona na porcie ${port}`));
