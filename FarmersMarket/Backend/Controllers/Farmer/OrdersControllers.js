// const Order = require("../../Models/Orders");

// const getOrdersOfFarmer = async (req, res) => {
//   try {
//     const { farmerId } = req.query;

//     if (!farmerId) {
//       return res.status(400).json({ message: "farmerId is required" });
//     }

//     const orders = await Order.find({ "cartItems.farmerId": farmerId }).sort({
//       orderedAt: -1,
//     });

//     const filteredOrders = [];

//     orders.forEach((order) => {
//       order.cartItems.forEach((item) => {
//         if (item.farmerId === farmerId) {
//           filteredOrders.push({
//             orderId: order.orderId,
//             productName: item.name,
//             quantity: item.quantity,
//             price: item.price,
//             transactionId: order.paymentId,
//             date: order.orderedAt,
//           });
//         }
//       });
//     });

//     res.status(200).json(filteredOrders);
//   } catch (error) {
//     console.log("Error fetching orders:", error);
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// module.exports = getOrdersOfFarmer;
const Order = require("../../Models/Orders");

const getOrdersOfFarmer = async (req, res) => {
  try {
    const { farmerId } = req.query;

    if (!farmerId) {
      return res.status(400).json({ message: "farmerId is required" });
    }

    const orders = await Order.find({
      "cartItems.farmerId": farmerId,
      orderStatus: "Delivered",
    }).sort({ orderedAt: -1 });

    const filteredOrders = [];

    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        if (item.farmerId === farmerId) {
          filteredOrders.push({
            orderId: order.orderId,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
            transactionId: order.paymentId,
            date: order.orderedAt,
          });
        }
      });
    });

    res.status(200).json(filteredOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = getOrdersOfFarmer;
