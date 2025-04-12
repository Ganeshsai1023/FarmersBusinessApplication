const express = require("express");
const getFarmerDetails = require("../Controllers/GetprofileControllers");
const Profilerouter = express.Router();
Profilerouter.get("/farmers/:farmerId", getFarmerDetails);
module.exports = Profilerouter;
