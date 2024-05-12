const express = require("express");
const router = express.Router();

const { login, signup } = require("../Controllers/Auth");
const { auth, isAdmin, isStudent } = require("../middlewares/auth");
const User = require("../models/User");

router.post("/login", login);
router.post("/signup", signup);

// testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for TESTS',
    });
});

// Protected Routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for Student',
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:'Welcome to the protected route for Admin',
    });
});

// We can fetch data using id -> (for testing)
// router.get("/getEmail", auth, async (req, res) => {

//     try {

//         const id = req.user.id;
//         console.log("ID: ", id);
//         const user = await User.findById(id);

//         res.status(200).json({
//             success:true,
//             user:user,
//             message:'Welcome to the email route',
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             error:error.message,
//             message:'Code fat gya',
//         });
//     }

// });

module.exports = router;