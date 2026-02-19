const express = require("express");
const router = express.Router();
const rewriteBullet = require("../controllers/rewrite");
const authJWT = require("../middleware/jwtAuth");


router.post("/",authJWT, rewriteBullet);

module.exports = router;
