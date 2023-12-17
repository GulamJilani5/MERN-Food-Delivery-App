const express = require("express");
const connectToMongoDB = require("./db");

const app = express();

connectToMongoDB();

///// manually setting cors middleware
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
///// using cors middleware
///// npm install cors
const domainURL = process.env.DOMAIN;
const cors = require("cors");
// Use the cors middleware to set up CORS handling
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: `${domainURL}` }));
//Define allowed headers (optional but can be useful)
app.options("*", cors()); // Enable preflight requests for all routes

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use(express.json());

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
// app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV == "producttion") {
  app.use(express.static("client/build"));
}
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
