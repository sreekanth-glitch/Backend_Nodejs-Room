const Room = require("../models/Room");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WhatIsYourName;

const roomRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const roomEmail = await Room.findOne({ email });
    if (roomEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newRoom = new Room({
      username,
      email,
      password: hashedPassword,
    });

    await newRoom.save();
    res.status(201).json({ message: "Registered successfully" });
    console.log("Registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const roomLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const room = await Room.findOne({ email });
    if (!room || !(await bcrypt.compare(password, room.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ roomId: room._id }, secretKey, {
      expiresIn: "1h",
    });

    const roomId = room._id;

    res.status(200).json({ success: "Login successful", token, roomId });
    console.log(email, "this is token", token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("details");
    res.json({ rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRoomById = async (req, res) => {
  const roomId = req.params.id;

  try {
    const room = await Room.findById(roomId).populate("details");
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { roomRegister, roomLogin, getAllRooms, getRoomById };
