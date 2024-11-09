const roomController = require("../controllers/roomControllers");
const express = require("express");

const router = express.Router();

// User registration and login routes
router.post("/register", roomController.roomRegister);
router.post("/login", roomController.roomLogin);

router.get("/all-rooms", roomController.getAllRooms);
router.get("/single-room/:id", roomController.getRoomById);

module.exports = router;
