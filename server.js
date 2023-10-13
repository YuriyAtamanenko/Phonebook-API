const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Database connection successful"))
  )
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
