const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("DB connection successful.");
  })
  .catch((err) => {
    console.log(`DB connection error:${err}`);
  });

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
