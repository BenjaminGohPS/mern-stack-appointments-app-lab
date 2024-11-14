const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minLength: 1 },
    type: { type: String, required: true, minLength: 1 },
    purpose: {
      type: String,
      required: false,
      default: "Appointment",
    },
    company: { type: String, required: false, default: "N/A" },
    address: { type: String, required: false, default: "TBC" },
    personnel: { type: String, required: false, default: "TBC" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    comments: { type: String, required: false, default: "nil" },
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("Appointments", AppointmentsSchema);
