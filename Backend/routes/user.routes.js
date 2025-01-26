import express from "express";
import { body } from "express-validator";
import { registerUser, verifyCodeVerificationUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
	"/register",
	upload.single("profileImage"),
	(req, res, next) => {
		try {
			// Convert flat form fields into nested fullname object
			if (req.body["fullname.firstname"] && req.body["fullname.lastname"]) {
				req.body.fullname = {
					firstname: req.body["fullname.firstname"],
					lastname: req.body["fullname.lastname"],
				};
				// Clean up the flat form fields
				delete req.body["fullname.firstname"];
				delete req.body["fullname.lastname"];
			}
			next();
		} catch (err) {
			console.error("Error parsing JSON:", err.message);
			return res.status(400).json({ message: "Error parsing form data" });
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

router.post("/otp", verifyCodeVerificationUser);

export default router;
