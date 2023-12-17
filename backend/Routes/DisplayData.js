const express = require("express");
const router = express.Router();

///// Sending fooditems to the client
router.post("/foodData", async (req, res) => {
  try {
    // console.log(global.food_Data);
    // console.log(global.food_Category);
    /////We are sending both the fooditems and foodcategory data to the client in an array.
    ///// URL : localhost:5000/api/foodData
    /////It's better to create different route(URL) for both types of data and send to client like i did in line 18
    res.send([global.food_Data, global.food_Category]);
  } catch (error) {
    console.error("Error", error.message);
    res.send({ success: false, message: "Server Error" });
  }
});

///// Sending foodcategory to the client
///// we are sending it in /foodData URL(route)
///// I have tested it on thunderclient and it is working fine.
///// URL: localhost:5000/api/foodCategory
// router.post("/foodCategory", async (req, res) => {
//   try {
//     // console.log(global.food_Data);
//     // console.log(global.food_Category);
//     res.send(global.food_Category);
//   } catch (error) {
//     console.error("Error", error.message);
//     res.send({ success: false, message: "Server Error" });
//   }
// });

module.exports = router;
