const Orders = require("../../Models/Orders");

const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    //console.log(orders);
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

module.exports = getOrders;
