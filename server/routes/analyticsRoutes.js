const express = require("express");
const authMiddlware = require("../middleware/authMiddlware");
const {
  bloodGroupDetailsController,
} = require("../controllers/analyticsController");

const router = express.Router();

//routes
//ADD inventory || POST

router.get(
  "/BloodGroup-record-data",
  authMiddlware,
  bloodGroupDetailsController
);

module.exports = router;
