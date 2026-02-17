const express = require("express");
const createReume = require("../controllers/resume");
const authJWT = require("../middleware/jwtAuth");
const router = express.Router();

router.post("/createresume",authJWT,createReume);

module.exports = router



