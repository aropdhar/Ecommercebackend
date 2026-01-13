const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  total: Number,
  vat: Number,
  payable: Number,
  cus_details: Object,
  tran_id: { type: String, unique: true },
  val_id: String,
  delivery_status: {
    type: String,
    enum: ["Pending", "Delivered", "canceled"],
    default: "Pending",
  },
  payment_status: {
    type: String,
    enum: ["Pending", "Success", "Failed", "Cancel"],
    default: "Pending",
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


const invoicemodel = mongoose.model("Invoice", invoiceSchema);

module.exports = {invoicemodel}

