require("dotenv").config();

const express = require("express");
const connectDB = require("./src/db/db");
const appointments = require("./src/routers/appointments");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/lab", appointments);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
