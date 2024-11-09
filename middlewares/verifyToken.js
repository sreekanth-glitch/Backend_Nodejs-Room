const Room = require("../models/Room");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

dotEnv.config();

const secretKey = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ error: "Token is required" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const room = await Room.findById(decoded.roomId);

    if (!room) {
      return res.status(404).json({ error: "room not found" });
    }

    req.roomId = room._id;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
