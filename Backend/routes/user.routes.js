import express from 'express';
import {body} from 'express-validator';
import { Router } from 'express';
import { getUserProfile, logoutUser, registerUser, loginUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';


const router = express.Router();
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
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