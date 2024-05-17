const express = require("express");
const router = express.Router();

let picture_controller = require("../controllers/pictureController");

// odniesienie do middleware
let authenticate = require("../middleware/authenticate");

// w tym miejscu zamiast definiować operacje, ustalamy jedynie ścieżki
// przypisujemy potrzebne elementy do budowy CRUD

// Dostęp do funkcji po adresem http://localhost:8000/pictures/
router.get("/", picture_controller.index);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/picturesList
router.get("/picturesList", authenticate, picture_controller.picture_list);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/pictureInstance/create
router.post("/pictureInstance/create", picture_controller.picture_create_post);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/create
router.get("/create", authenticate, picture_controller.picture_create_get);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/create
router.post("/create", authenticate, picture_controller.picture_create_post);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/id
router.get("/:id", picture_controller.picture_info);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/update/:id
router.get("/update/:id", authenticate, picture_controller.picture_update_get);

// Dostęp do funkcji po adresem http://localhost:8000/pictures/update/:id
router.post("/update/:id", authenticate, picture_controller.picture_update_post);

router.post("/delete", authenticate, picture_controller.picture_delete_post);

console.log("router gotowy!");

module.exports = router;
