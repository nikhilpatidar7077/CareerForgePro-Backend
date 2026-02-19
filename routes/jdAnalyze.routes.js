const express = require("express");
const analyzeJD = require("../controllers/jdAnalyze");
const authJWT = require("../middleware/jwtAuth");

const router = express.Router();

router.post("/analyze",authJWT,analyzeJD);

module.exports = router