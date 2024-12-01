const express = require("express");
const detailsController = require("../controllers/detailsControllers");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/add-details", verifyToken, detailsController.addDetails);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "..", "uploads", imageName));
});

router.get("/:roomId/details", detailsController.getRoomDetails);

router.delete("/:detailsId", detailsController.deleteRoomDetails);

module.exports = router;
