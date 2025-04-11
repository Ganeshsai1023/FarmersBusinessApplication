const {
  checkEmailExistsFarm,
  checkEmailExistsCons,
  CheckAdminExists,
} = require("../Controllers/EmailCheck");
const express = require("express");
const emailCheckRouter = express.Router();
emailCheckRouter.post("/check-emailfarm", checkEmailExistsFarm);
emailCheckRouter.post("/check-emailCons", checkEmailExistsCons);
emailCheckRouter.post("/check-usernameadmin", CheckAdminExists);
module.exports = emailCheckRouter;
