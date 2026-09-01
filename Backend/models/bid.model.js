import mongoose from 'mongoose';

const BidSchema = mongoose.Schema({
  _id: Number,
  pid: {
    type: Number,
    required: [true, "Product ID is required"]
  },
  p_title: String,
  useremail: {
    type: String,
    required: [true, "User email is required"],
    lowercase: true,
    trim: true
  },
  transporter_email: {
    type: String,
    required: [true, "Transporter email is required"],
    lowercase: true,
    trim: true
  },
  bid_price: {
    type: Number,
    required: [true, "Bid price is required"]
  },
  vehicle_type: {
    type: String,
    required: true
  },
  rider_name: String,
  rider_mobile: String,
  vehicle_number: String,
  max_weight: String,
  pickupLocation: String,
  dropLocation: String,
  msg: String,
  status: {
    type: String,
    default: "pending" // pending, accepted, rejected
  },
  stageIndex: {
    type: Number,
    default: 0 // 0: Pickup Scheduled, 1: Picked Up, 2: In Transit, 3: Delivered
  },
  info: String
});

const BidSchemaModel = mongoose.model('bid_collection', BidSchema);
export default BidSchemaModel;