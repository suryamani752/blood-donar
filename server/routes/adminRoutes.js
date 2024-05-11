const express = require("express");
const authMiddlware = require("../middleware/authMiddlware");
const {
  getDonarListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  deleteHospitalController,
  deleteOrgController,
} = require("../controllers/adminController");
const adminmiddlware = require("../middleware/adminmiddlware");

const router = express.Router();

//routes
router.get(
  "/donar-list",
  authMiddlware,
  adminmiddlware,
  getDonarListController
);
router.get(
  "/hospital-list",
  authMiddlware,
  adminmiddlware,
  getHospitalListController
);
router.get(
  "/organisation-list",
  authMiddlware,
  adminmiddlware,
  getOrgListController
);
router.delete(
  "/delete-donar/:id",
  authMiddlware,
  adminmiddlware,
  deleteDonarController
);
router.delete(
  "/delete-hospital/:id",
  authMiddlware,
  adminmiddlware,
  deleteHospitalController
);
router.delete(
  "/delete-org/:id",
  authMiddlware,
  adminmiddlware,
  deleteOrgController
);

//export
module.exports = router;
