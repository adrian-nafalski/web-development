const express = require("express");
const router = express.Router();

let user_controller = require("../controllers/commentsController");

router.post("/add/:id", user_controller.add);

module.exports = router;
