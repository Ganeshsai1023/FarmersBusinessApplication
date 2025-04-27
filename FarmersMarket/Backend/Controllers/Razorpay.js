require("dotenv").config();
const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_API_kEY,
  key_secret: process.env.RAZOR_PAY_SECRET_kEY,
  headers: {
    "X-Razorpay-Account": "Give your merchantId",
  },
});
module.exports = instance;
