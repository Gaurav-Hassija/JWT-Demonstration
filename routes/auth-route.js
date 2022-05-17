const route = require("express").Router();
const { signUp, userLogin, getData } = require("../controller/auth-controller");
const { requireAuth } = require("../middleware/required-auth");

route.post("/login", userLogin);
route.post("/signup", signUp);
route.get("/data", requireAuth, getData);

module.exports = route;
