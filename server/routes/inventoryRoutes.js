const express = require("express");
const authMiddlware = require("../middleware/authMiddlware");
const {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrgForHosptialController,
  getInventoryHospitalController,
  recentRecordController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//ADD inventory || POST
router.post("/create-inventory", authMiddlware, createInventoryController);
router.get("/get-inventory", authMiddlware, getInventoryController);
router.get("/get-recent-record", authMiddlware, recentRecordController);
router.post(
  "/get-inventory-hospital",
  authMiddlware,
  getInventoryHospitalController
);
router.get("/get-donar", authMiddlware, getDonarController);
router.get("/get-hospital", authMiddlware, getHospitalController);
router.get("/get-organisation", authMiddlware, getOrganisationController);
router.get("/get-org-for-hospital", authMiddlware, getOrgForHosptialController);

module.exports = router;
