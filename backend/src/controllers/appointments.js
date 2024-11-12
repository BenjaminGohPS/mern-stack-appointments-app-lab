const AppointmentsModel = require("../models/Appointments");
const mongoose = require("mongoose");

const seedAppointments = async (req, res) => {
  try {
    await AppointmentsModel.deleteMany({});

    await AppointmentsModel.create([
      {
        _id: "64d0f3f75676c304033d8c8a",
        name: "Dental appointment",
        date: "14/12/2024",
        location: "Clementi",
      },
      {
        _id: "64d0f3f75676c304033d8c8b",
        name: "Dinner with friends",
        date: "18/12/2024",
        location: "TBC",
      },
      {
        _id: "64d0f3f75676c304033d8c8c",
        name: "Movie",
        date: "20/12/2024",
        location: "Plaza Singapura",
      },
    ]);

    res.json({ status: "ok", msg: "seeding successful" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "unable to seed appointments" });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentsModel.find();
    if (appointments.length > 0) {
      return res.json(appointments);
    } else {
      res.status(400).json({ status: "error", msg: "no appointment found" });
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting appointments" });
  }
};

const getOneAppointment = async (req, res) => {
  try {
    const appointmentId = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      res.status(400).json({ status: "error", msg: "invalid appointment ID" });
    } else {
      const appointment = await AppointmentsModel.findById(appointmentId);

      if (appointment) {
        res.json(appointment);
      } else {
        res.status(400).json({ status: "error", msg: "no appointment found" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting appointments" });
  }
};



module.exports = { seedAppointments, getAllAppointments, getOneAppointment };

/* workings

ok Get - getAllAppointment
ok Post - getOneAppointment
Put - addAppointment
Delete - deleteOneAppointment
patch - updateOneAppointment



User Requirements
As A User (AAU) I would like to able to store all appointments that I have regardless of interviews with clients, lunch with friends, medical appointments for family members.
AAU, I would like to be able to add new appointments into the app, so that I can all my appointments are up to date.
AAU, I would like to be able to see a brief version of all appointments and if I need too to, to be able to see all the details of a single appointment.
AAU, I would like to be able to delete any appointments so that I can remove any appointment that has been cancelled.
AAU, I would like to be able to update any appointment so that I can change any details pertaining to that appointment, whether a change of date/time, address, etc.

*/
