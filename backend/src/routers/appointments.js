const express = require("express");
const router = express.Router();
const {
  seedAppointments,
  getAllAppointments,
  getOneAppointment,
} = require("../controllers/appointments");

router.get("/appointments/seed", seedAppointments);
router.get("/appointments", getAllAppointments);
router.post("/appointments", getOneAppointment);

module.exports = router;
