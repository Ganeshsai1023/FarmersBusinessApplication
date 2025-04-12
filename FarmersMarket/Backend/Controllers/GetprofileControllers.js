const Farmer = require("../Models/Farmer");

const getFarmerDetails = async (req, res) => {
  const farmerId = req.params.farmerId;
  try {
    const farmer = await Farmer.findOne({ farmerId }).select(
      "fullName email password aadharNo address phone photo"
    );
    if (!farmer) {
      return res.status(200).json({ message: "Farmer not found" });
    }

    res.status(200).json(farmer);
  } catch (error) {
    console.error("Error fetching farmer details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getFarmerDetails;
