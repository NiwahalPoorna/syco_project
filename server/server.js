// Load env variables
// Load env variables only in production mode
// Load env variables production mode
// json-server --host 0.0.0.0 db.json
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const connectToDb = require("./config/connectToDb");

// Import dependencies
const express = require("express");
// Create an express instance (app)
const app = express();
const bodyParser = require("body-parser");

connectToDb();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const adminRoute = require("./routes/adminRoute"); // Require users route file
const userRoute = require("./routes/taxUserRoute");

// const paymentRoute = require("./routes/paymentRoute");

// Use the users route with the '/users' URL prefix
app.use("/admin", adminRoute);
app.use("/user", userRoute);

// app.use("/intents", paymentRoute);


app.get("/", (req, res) => {
  res.send("Hello world");
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});

// curl -X POST -H "Content-Type: application/json" \
// 		-d "{\"amount\":17950}" \
//     http://localhost:3000/payments/intents
