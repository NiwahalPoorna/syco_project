const express = require("express");
const router = express.Router();
const user = require("../models/taxUserModel");

const app = express();
app.use(express.json());

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const newuser = new user({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      mobileNumber: req.body.mobileNumber,
      nicNumber: req.body.nicNumber,
      companyName:req.body.companyName,
      password: req.body.password,
      repassword: req.body.rePassword,
      agree: req.body.agree,
    });

    // Save the new Admin document to the database
    await newuser.save();

    // Send success response
    res.status(200).json({ message: "Tax user created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Handle the duplicate key error
      res.status(400).json({ message: "The value already exists" });
    } else {
      // Handle other errors
      res.status(500).json({ message: "An error occurred" });
    }
  }
});

router.post("/login", async (req, res) => {
  // Get email and password from request body
  const { email, password } = req.body;

  // Find user in the database
  const User = await user.findOne({ email: email });

  if (!User) {  
    // User not found
    return res.status(401).send({ message: "Invalid email or password" });
  }

  // Check password
  if (User.password !== password) {
    // Incorrect password
    return res.status(401).send({ message: "Invalid email or password" });
    
  }

  // Successful login
  res.status(200).send({ message: "Login successful" });
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// router.get("/staff-emp/:_id", async (req, res) => {
//   try {
//     const staff = await Staff.findOne({ _id: req.params._id });
//     if (!staff) {
//       return res.status(404).json({ message: "Bus not found" });
//     }
//     res.json(staff);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.put("/staff-emp/:_id", async (req, res) => {
//   try {
//     console.log(req.body);

//     const staff = await Staff.findByIdAndUpdate(
//       req.params._id,
//       {
//         staffId: req.body.staffId,
//         name: req.body.name,
//         nic: req.body.nic,
//         position: req.body.position,
//         phoneNumber: req.body.phoneNumber,
//         email: req.body.email,
//       },
//       { new: true }
//     );
//     if (!staff) {
//       // If the updated document is null or undefined, return a 404 error
//       return res
//         .status(404)
//         .json({ message: "Could not find the bus route to update." });
//     }
//     res.json(staff);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({
//         message: "Could not update the bus route. Please try again later.",
//       }); // Return a generic error message
//   }
// });

router.delete("/user/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.send("Tax user delete successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});




module.exports = router;
