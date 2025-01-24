import express from "express";
import { body } from "express-validator";
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
   "/register",
   [
      body("email").isEmail().withMessage("Invalid Email"),
      body("fullname.firstname")
         .isLength({ min: 3 })
         .withMessage("First name must be at least 3 characters long")
         .isLength({ max: 60 })
         .withMessage("First name must be at most 60 characters long"),
      body("fullname.lastname")
         .isLength({ min: 3 })
         .withMessage("Last name must be at least 3 characters long")
         .isLength({ max: 60 })
         .withMessage("Last name must be at most 60 characters long"),
      body("password")
         .isLength({ min: 6 })
         .withMessage("Password must be at least 6 characters long")
         .isLength({ max: 20 })
         .withMessage("Password must be at most 20 characters long")
         .matches(/(?=.*[A-Z])(?=.*[!@#$&*])/)
         .withMessage("Password must contain at least one uppercase letter and one symbol"),
      body("confirmPassword").custom((value, { req }) => {
         if (value !== req.body.password) {
            throw new Error("Passwords do not match");
         }
         return true;
      }),
   ],
   registerUser
);

// router.post(
//   "/login",
//   [
//     body("email").isEmail().withMessage("Invalid Email"),
//     body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
//   ],
//   loginUser
// );

// router.get("/profile", authMiddleware.authUser, getUserProfile);

// router.get("/logout", authMiddleware.authUser, logoutUser);

export default router;
