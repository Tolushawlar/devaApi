const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/user.route");
const WalletRoutes = require("./routes/wallet.routes");
const TransactionRoutes = require("./routes/transcation.route");
const authenticate = require("./middleware/authenticate.middleware");
const app = express();
const port = 8081;

//app.use(cors);
app.use(express.json());
// app.use(authenticate)
app.use(UserRoutes);
app.use(WalletRoutes);
app.use(TransactionRoutes);
const dbURL =
  "mongodb+srv://holushawlar:Born1996@cluster0.y1tysym.mongodb.net/";

try {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.once("open", (error, db) => {
    if (error) {
      console.log("Error connecting to db");
    } else {
      console.log("connection Successful");
    }
  });
} catch (error) {
  console.log(error);
}
app.listen(port, () => {
  console.log("Connected" + port);
});
