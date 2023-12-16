const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("data Base Connected..");
});
mongoose.connection.on("error", () => {
  console.log("data Base Connection Fail..");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Data Base connection disconnected Coz of  app termination");
    process.exit(0);
  });
});
