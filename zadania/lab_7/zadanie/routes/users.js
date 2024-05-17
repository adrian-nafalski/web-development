const express = require('express');
const generateUniqueId = require("generate-unique-id");

const router = express.Router();

const uzytkownicy = [
    {
        id: generateUniqueId(),
        imie: "Jan",
        nazwisko: "Kowalski",
        email: "JanKowalski@przyklad.pl",
        wiek: 23,
    },
    {
        id: generateUniqueId(),
        imie: "Mateusz",
        nazwisko: "Kwiatkowski",
        email: "MateuszKwiatkowski@przyklad.pl",
        wiek: 23,
    },
];

router.get('/', (req, res) => {
    res.send(uzytkownicy);
});

router.post('/', (req, res) => {
    console.log('odbieram dane');
    const uzytkownik = req.body;
    uzytkownicy.push(uzytkownik);

    res.send(uzytkownicy);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const uzytkownikPoImieniu = uzytkownicy.find((user) => user.imie === id);
    res.send(uzytkownikPoImieniu);
});

module.exports = router;
