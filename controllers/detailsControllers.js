const Details = require("../models/Details");
const Room = require("../models/Room");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder where the uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
  },
});

const upload = multer({ storage: storage });

const addDetails = async (req, res) => {
  try {
    const { name, phone, total, perHead, area, city, description } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const room = await Room.findById(req.roomId);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    }

    const details = new Details({
      name,
      phone,
      total,
      perHead,
      area,
      city,
      description,
      image,
      room: room._id,
    });

    const savedDetails = await details.save();

    const detailsId = savedDetails._id;
    const roomDetailsName = savedDetails.name;

    room.details.push(savedDetails);

    await room.save();

    return res.status(200).json({
      message: "Details Added successfully ",
      detailsId,
      roomDetailsName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("intenal server error");
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const room = await Room.findById(roomId).populate("details");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room.details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRoomDetails = async (req, res) => {
  try {
    const detailsId = req.params.detailsId;
    const deleteDetails = await Details.findByIdAndDelete(detailsId);

    if (!deleteDetails) {
      return res.status(404).json({ error: "No details found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addDetails: [upload.single("image"), addDetails],
  getRoomDetails,
  deleteRoomDetails,
};
