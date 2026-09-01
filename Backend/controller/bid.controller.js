import '../models/connection.js';
import BidSchemaModel from '../models/bid.model.js';

// 1. Transporter Bid Submit Karega
export var save = async (req, res) => {
  try {
    var bidList = await BidSchemaModel.find();
    var len = bidList.length;
    var _id = len == 0 ? 1 : bidList[len - 1]._id + 1;

    var bidDetails = {
      ...req.body,
      _id: _id,
      status: "pending",
      stageIndex: 0,
      info: Date()
    };

    await BidSchemaModel.create(bidDetails);
    res.status(201).json({ status: true, msg: "Bid submitted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, msg: "Failed to submit bid" });
  }
};

// 2. Fetch Bids
export var fetch = async (req, res) => {
  try {
    var condition_obj = req.query.condition_obj;
    if (condition_obj != undefined) {
      condition_obj = JSON.parse(condition_obj);
    } else {
      condition_obj = {};
    }

    var bids = await BidSchemaModel.find(condition_obj);
    // Empty result ko bhi 200 ke saath khaali array return karo,
    // taaki frontend ke Promise.all() calls dusri API fail hone par crash na ho
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

// 3. Status Update (Jab User Bid Accept/Reject karega)
export var updateStatus = async (req, res) => {
  try {
    var id = req.body._id || req.body.bidId;
    var { status, pid } = req.body;

    var result = await BidSchemaModel.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    if (result.modifiedCount > 0 || result.acknowledged) {
      res.status(200).json({ status: true, msg: `Bid status updated to ${status}` });
    } else {
      res.status(404).json({ status: false, msg: "Bid not found or unchanged" });
    }
  } catch (error) {
    console.log("Error updating bid status:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

// 4. Fetch Active Deliveries (Transporter Panel ke liye - Direct Accepted Bids)
export var fetchActiveDeliveries = async (req, res) => {
  try {
    var transporterEmail = req.query.transporterEmail;
    var condition = { status: "accepted" };

    if (transporterEmail) {
      condition.transporter_email = transporterEmail;
    }

    var activeBids = await BidSchemaModel.find(condition);
    res.status(200).json(activeBids);
  } catch (error) {
    console.log("Error fetching active deliveries:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

// 5. Update Delivery Stage (Tracker Update ke liye)
export var updateStage = async (req, res) => {
  try {
    var { bidId, stageIndex } = req.body;

    var result = await BidSchemaModel.updateOne(
      { _id: bidId },
      { $set: { stageIndex: stageIndex } }
    );

    if (result.modifiedCount > 0 || result.acknowledged) {
      res.status(200).json({ status: true, msg: "Stage updated successfully" });
    } else {
      res.status(404).json({ status: false, msg: "Bid not found" });
    }
  } catch (error) {
    console.log("Error updating stage:", error);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};