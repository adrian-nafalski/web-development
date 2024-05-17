const express = require("express");
const router = express.Router();

// musimy dodać kontroler aby był widoczny dla naszych ścieżek
let picture_controller = require("../controllers/pictureController");

// w tym miejscu zamiast definiować operacje, ustalamy jedynie ścieżki
// przypisujemy potrzebne elementy do budowy CRUD

// Dostęp do funkcji po adresem http://localhost:8000/pictures/
router.get("/", picture_controller.index);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/picturesList
router.get("/picturesList", picture_controller.picture_list);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/pictureInstance/create
router.post("/pictureInstance/create", picture_controller.picture_create_post);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/create
router.get("/create", picture_controller.picture_create_get);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/create
router.post("/create", picture_controller.picture_create_post);

console.log("router gotowy!");

module.exports = router;
