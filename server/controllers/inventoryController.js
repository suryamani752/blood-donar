const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedBloodQuantity = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate blood quantity
      const totalInRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("total in", totalInRequestedBlood);
      const totalIn = totalInRequestedBlood[0]?.total || 0;
      //total out blood quantity
      const totalOutRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutRequestedBlood[0]?.total || 0;

      //in or out calculation
      const availableBloodQuantity = totalIn - totalOut;

      if (availableBloodQuantity < requestedBloodQuantity) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableBloodQuantity} ml of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }
    //save
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "new blood record added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory",
      error,
    });
  }
};

const getInventoryController = async (req, res) => {
  try {
    const getInventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get all record successfully",
      getInventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventory",
      error,
    });
  }
};

//hospital blood record
const getInventoryHospitalController = async (req, res) => {
  try {
    const getInventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "get hospital record successfully",
      getInventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get hosptital all inventory",
      error,
    });
  }
};

// Blood record of top 3
const recentRecordController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.body.userId })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent record data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in recent record",
      error,
    });
  }
};

//donar inventory
const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const donarId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // console.log(donarId);
    const donar = await userModel.find({ _id: { $in: donarId } });
    return res.status(200).send({
      success: true,
      message: "Get Donar record successfully",
      donar,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar record",
      error,
    });
  }
};

//get hospital record
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    const hospital = await userModel.find({ _id: { $in: hospitalId } });
    return res.status(200).send({
      success: true,
      message: "Get hospital  record successfully",
      hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Hospital record",
      error,
    });
  }
};

//get organisation record
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    const org = await userModel.find({ _id: { $in: orgId } });

    return res.status(200).send({
      success: true,
      message: "Get org record successfully",
      org,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in org record",
      error,
    });
  }
};

//get organisation for hospital
const getOrgForHosptialController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    const org = await userModel.find({ _id: { $in: orgId } });

    return res.status(200).send({
      success: true,
      message: "Get hospital org record successfully",
      org,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital org record",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarController,
  getHospitalController,
  getOrganisationController,
  getOrgForHosptialController,
  getInventoryHospitalController,
  recentRecordController,
};
