const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const cookieparser = require("cookie-parser");
const UserRouter = require("./routes/userRoute");

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use("/api", UserRouter);
// variables
app.use(cookieparser());
const Port = 8080;
const DATABASE_URL =
  "mongodb+srv://agyinjohn97:nCUKNewVDnK5cM9h@cluster0.gfy1xs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DATABASE_URL)
  .then((val) => console.log("You have connected to the server"));

app.listen(Port, () => {
  console.log(`Server is listening on ${Port}`);
});
