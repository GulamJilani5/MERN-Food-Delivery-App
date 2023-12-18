// const mongoose = require("mongoose");
// require("dotenv").config();
// const DbURI = process.env.DB_CONNECTION_STRING;

///// Method 1  -- It is not working
// const mongoDB = async () => {
//   await mongoose.connect(DbURI, { useNewURLParser: true }, (err, success) => {
//     if (err) {
//       console.log("Database connection Error: ", err);
//     } else {
//       console.log("Database connection successfull!!!");
//     }
//   });
// };

///// Method 2
///// Taken this code from nodejs udemy course
//// without async and await it is also working... *****I should get the reason behind it
// const mongoDB = async () =>
//   await mongoose
//     .connect(DbURI)
//     .then((con) => {
// console.log(con)
// console.log("Database Connection Successful!!!");
//   const fetched_data = mongoose.connection.db.collection("fooditem");
//   console.log(fetched_data);
// })
// .then(async () => {
//   console.log("a");
//   fetched_data = await mongoose.connection.db.collection("fooditem");
//   console.log("aa");
//   fetched_data.find({}).toArray(function (err, data) {
//     console.log("aaa");
//     if (err) {
//       console.log("document finding error ", err);
//     } else {
//       console.log("document found", data);
//     }
//   });
//   console.log("b");
//   mongoose.connection.db
//     .collection("fooditem")
//     .find({})
//     .toArray((err, results) => {
//       if (err) {
//         console.error("Error finding documents:", err);
//       } else {
//         console.log("Found documents:", results);
//       }
//     });
// })
// .catch((err) => {
//   console.log("DB connection error: ", err.message);
// });

///// Method 3
///// Taken this code from nextjs authentication project

// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(DbURI);
/*
    It should remain disbaled 
     const isConnection = mongoose.connection;
     console.log("connection", isConnection);
     isConnection.on("connected", () => {
      console.log("mongoDB db connection successful!!");
     });
    isConnection.on("error", (err) => {
       console.log("MongoDB connection error!!! ", err.message);
      process.exit();
     });
   */

// console.log("mongoDB db connection successful!!");
// const foodItems = await mongoose.connection.db
//   .collection("fooditems")
//   .find({})
//   .toArray();

//     const foodCategories = await mongoose.connection.db
//       .collection("foodcategory")
//       .find({})
//       .toArray();
//     global.food_Data = foodItems;
//     global.food_Category = foodCategories;
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// }

// module.exports = connectToMongoDB;

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////// CHAT GPT
////// It is working perfectly fine

// const mongoose = require("mongoose");

// Establish a connection to your MongoDB database
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(DbURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// An async function to read collection data
// async function readCollectionData() {
//   try {
//     // Connect to MongoDB
//     await connectToMongoDB();

//     const foodItems = await mongoose.connection.db
//       .collection("fooditems")
//       .find({})
//       .toArray();

//     console.log("Food items:", foodItems);
//   } catch (error) {
//     console.error("Error reading collection data:", error);
//   } finally {
//     // Close the MongoDB connection when done
//     await mongoose.connection.close();
//     console.log("Disconnected from MongoDB");
//   }
// }

// // Call the function to read collection data
// readCollectionData();

// module.exports = connectToMongoDB;
