import mongoose from 'mongoose';

const TxnSchema = mongoose.Schema({
  _id: Number,
  uid: {
    type: String,
    lowercase: true,
    trim: true,
  },
  amt: Number,
  info: String
});


// compile schema to model
const TxnSchemaModel = mongoose.model('txn_collection',TxnSchema);

export default TxnSchemaModel;