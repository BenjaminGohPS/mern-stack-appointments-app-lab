const express = require("express");
const router = express.Router();
const {
  seedAppointments,
  getAllAppointments,
  getOneAppointment,
  deleteOneAppointment,
  addAppointment,
  updateOneAppointment,
} = require("../controllers/appointments");

router.get("/appointments/seed", seedAppointments);
router.get("/appointments", getAllAppointments);
router.post("/appointments", getOneAppointment);
router.delete("/appointments", deleteOneAppointment);
router.put("/appointments", addAppointment);
router.patch("/appointments/:id", updateOneAppointment);

module.exports = router;
