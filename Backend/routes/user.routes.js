import express from "express";
import { body } from "express-validator";
import {
	deleteUser,
	forgetPasswordUser,
	getProfileUser,
	loginUser,
	logoutUser,
	registerUser,
	verifyCodeVerificationUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
	"/register",
	upload.single("profileImage"),
	(req, res, next) => {
		try {
			// If fullname is provided as a JSON string, parse it
			if (req.body.fullname && typeof req.body.fullname === "string") {
				try {
					req.body.fullname = JSON.parse(req.body.fullname);
				} catch (err) {
					console.error("Error parsing fullname JSON:", err.message);
					return res.status(400).json({ message: "Invalid fullname format" });
				}
			}

			// Alternatively, if fullname is provided as separate fields, construct it
			if (req.body["fullname.firstname"] && req.body["fullname.lastname"]) {
				req.body.fullname = {
					firstname: req.body["fullname.firstname"],
					lastname: req.body["fullname.lastname"],
				};
				delete req.body["fullname.firstname"];
				delete req.body["fullname.lastname"];
			}

			next();
		} catch (err) {
			console.error("Middleware error:", err.message);
			return res.status(500).json({ message: "Internal Server Error" });
		}
	},
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
		body("mobileNumber")
			.isLength({ min: 10, max: 10 })
			.withMessage("Mobile number must be at least 10 digits long"),
	],
	registerUser
);

router.post(
	"/login",
	[
		body("email").optional().isEmail().withMessage("Invalid Email"),
		body("mobileNumber")
			.optional()
			.isLength({ min: 10, max: 10 })
			.withMessage("Mobile number must be at least 10 digits long"),
		body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
		(req, res, next) => {
			if (!req.body.email && !req.body.mobileNumber) {
				return res.status(400).json({ message: "Either email or mobile number is required" });
			}
			next();
		},
	],
	loginUser
);

router.post("/verifycode", authUser, verifyCodeVerificationUser);
router.get("/logout", authUser, logoutUser);
router.get("/profile", authUser, getProfileUser);
router.post(
	"/forget",
	[
		body("email").optional().isEmail().withMessage("Invalid Email"),
		body("mobileNumber")
			.optional()
			.isLength({ min: 10, max: 10 })
			.withMessage("Mobile number must be at least 10 digits long"),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password must be at least 6 characters long")
			.isLength({ max: 20 })
			.withMessage("Password must be at most 20 characters long")
			.matches(/(?=.*[A-Z])(?=.*[!@#$&*])/)
			.withMessage("Password must contain at least one uppercase letter and one symbol"),
		(req, res, next) => {
			if (!req.body.email && !req.body.mobileNumber) {
				return res.status(400).json({ message: "Route Either email or mobile number is required" });
			}
			next();
		},
	],
	forgetPasswordUser
);

router.get("/delete", authUser, deleteUser);

export default router;
