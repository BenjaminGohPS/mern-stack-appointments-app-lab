const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 1 },
    date: { type: String, required: true },
    location: { type: String, required: false, default: "TBC" },
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("Appointments", AppointmentsSchema);
