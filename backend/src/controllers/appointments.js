const AppointmentsModel = require("../models/Appointments");
const mongoose = require("mongoose");

const seedAppointments = async (req, res) => {
  try {
    await AppointmentsModel.deleteMany({});

    await AppointmentsModel.create([
      {
        _id: "64d0f3f75676c304033d8c8a",
        title: "Dental appointment",
        type: "Medical",
        purpose: "Medical",
        company: "NUH",
        address: "5 Lower Kent Ridge Rd, Singapore 119074",
        personnel: "Dr Low",
        date: "14/12/2024",
        time: "2pm",
        comments: "Medical Review with Dr Low",
      },
      {
        _id: "64d0f3f75676c304033d8c8b",
        title: "Dinner with friends",
        type: "Dinner",
        purpose: "Catch up with friends",
        company: "N/A",
        address: "TBC",
        personnel: "Alvin, John, Marcus",
        date: "18/12/2024",
        time: "7pm",
        comments: "Monthly catch up over dinner",
      },
      {
        _id: "64d0f3f75676c304033d8c8c",
        title: "Movie Night",
        type: "Movie",
        purpose: "Movie time",
        company: "N/A",
        address: "Plaza Singapore",
        personnel: "Jane",
        date: "20/12/2024",
        time: "10pm",
        comments: "bring flowers",
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

const deleteOneAppointment = async (req, res) => {
  try {
    const appointmentId = req.body.id;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      res.status(400).json({ status: "error", msg: "invalid appointment ID" });
    } else {
      const appointment = await AppointmentsModel.findById(appointmentId);

      if (appointment) {
        await AppointmentsModel.findByIdAndDelete(appointmentId);
        res.json({ status: "ok", msg: "appointment deleted" });
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

const addAppointment = async (req, res) => {
  try {
    const existingAppointment = await AppointmentsModel.findOne({
      title: req.body.name,
      date: req.body.date,
    });

    if (existingAppointment) {
      res.status(400).json({
        status: "error",
        msg: "An appointment with the same name and date exists",
      });
    } else {
      const newAppointment = new AppointmentsModel({
        title: req.body.title,
        type: req.body.type,
        purpose: req.body.purpose,
        company: req.body.company,
        address: req.body.address,
        personnel: req.body.personnel,
        date: req.body.date,
        time: req.body.time,
        comments: req.body.comments,
      });

      await newAppointment.save();
      res.json({ status: "ok", msg: "appointment added" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error adding appointment" });
  }
};

const updateOneAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      res.status(400).json({ status: "error", msg: "invalid appointment ID" });
    } else {
      const appointment = await AppointmentsModel.findById(appointmentId);

      if (appointment) {
        await AppointmentsModel.findByIdAndUpdate(appointmentId, {
          title: req.body.title || appointment.title,
          type: req.body.type || appointment.type,
          purpose: req.body.purpose || appointment.purpose,
          company: req.body.company || appointment.company,
          address: req.body.address || appointment.address,
          personnel: req.body.personnel || appointment.personnel,
          date: req.body.date || appointment.date,
          time: req.body.time || appointment.time,
          comments: req.body.comments || appointment.comments,
        });
        res.json({ status: "ok", msg: "appointment updated" });
      } else {
        res.status(400).json({ status: "error", msg: "no appointment found" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error updating appointment" });
  }
};

module.exports = {
  seedAppointments,
  getAllAppointments,
  getOneAppointment,
  deleteOneAppointment,
  addAppointment,
  updateOneAppointment,
};

/* workings

ok Get - getAllAppointment
ok Post - getOneAppointment
ok Put - addAppointment
ok Delete - deleteOneAppointment
ok patch - updateOneAppointment



User Requirements
As A User (AAU) I would like to able to store all appointments that I have regardless of interviews with clients, lunch with friends, medical appointments for family members.
AAU, I would like to be able to add new appointments into the app, so that I can all my appointments are up to date.
AAU, I would like to be able to see a brief version of all appointments and if I need too to, to be able to see all the details of a single appointment.
AAU, I would like to be able to delete any appointments so that I can remove any appointment that has been cancelled.
AAU, I would like to be able to update any appointment so that I can change any details pertaining to that appointment, whether a change of date/time, address, etc.

*/
