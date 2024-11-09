const Details = require("../models/Details");
const Room = require("../models/Room");
const multer = require("multer");

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

const deleteDetailsById = async (req, res) => {
  try {
    const roomId = req.params.detailsId;

    const deletedDetails = await Details.findByIdAndDelete(detailsId);

    if (!deletedDetails) {
      return res.status(404).json({ error: "No room details found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  addDetails: [upload.single("image"), addDetails],
  deleteDetailsById,
};