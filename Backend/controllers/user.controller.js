import userModel from "../models/user.model.js";
import { validationResult } from "express-validator"; //the validation in route,if it lead to to wrong value and need to perform action on it
import blackListTokenModel from "../models/blackListToken.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import createUser from "../services/user.service.js";
import sendSms from "../utils/sendSms.js";
import deleteOnCloudinary from "../utils/deleteOnCloudinary.js";
import sendEmail from "../utils/SendMail.js";

export const registerUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req);
	console.log(req.body);

	//if something if wrong the give error in routes comes in errors.array
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullname, email, password, confirmPassword, address, mobileNumber } = req.body;

	const isUserEmailAlreadyExists = await userModel.findOne({ email });
	if (isUserEmailAlreadyExists) {
		throw new ApiError(400, "User email already exists");
	}

	const isUserMobileNumberAlreadyExists = await userModel.findOne({ mobileNumber });
	if (isUserMobileNumberAlreadyExists) {
		throw new ApiError(400, "User mobile number already exists");
	}

	if (password !== confirmPassword) {
		throw new ApiError(400, "Password and confirm password do not match");
	}

	const hashedPassword = await userModel.hashPassword(password);

	// Correct ProfileImage path (use req.file)
	const ProfilePictureLocalPath = req.file?.path;
	let profileImageUrl = process.env.DEFAULT_PROFILE_IMAGE_URL;
	if (ProfilePictureLocalPath) {
		// Upload to Cloudinary
		const profileImage = await uploadOnCloudinary(ProfilePictureLocalPath);
		if (!profileImage) {
			return res.status(400).json({ error: "Error uploading profile picture" });
		}
		profileImageUrl = profileImage.url;
	}

	const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

	try {
		console.log("h");
		console.log(profileImageUrl);

		const user = await createUser({
			firstname: fullname.firstname,
			lastname: fullname.lastname,
			email,
			password: hashedPassword,
			address,
			profileImage: profileImageUrl,
			mobileNumber,
			verifyCode,
		});

		user.deleteUserIfNotVerified();

		// Remove verifyCode before sending the response
		const userObject = user.toObject();
		delete userObject.verifyCode;

		sendSms(user.mobileNumber, user.fullname.firstname, user.fullname.lastname, verifyCode);
		sendEmail(user.email, "Email Verification", `Your verification code is ${verifyCode}`);

		const token = user.generateAuthToken(); //give id of user

		// Set token in cookie
		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
			sameSite: "None",
			secure: true,
		});

		return res.status(201).json(new ApiResponse(201, "User created successfully", { user: userObject }));
	} catch (error) {
		throw new ApiError(400, "error in registering", error.message);
	}
});

export const verifyCodeVerificationUser = asyncHandler(async (req, res) => {
	const { verifyCode } = req.body;

	const user = await userModel.findById(req.user._id).select("+verifyCode");
	if (!user) {
		throw new ApiError(400, "User not found");
	}

	if (user.verifyCode !== verifyCode) {
		throw new ApiError(400, "Invalid OTP");
	}
	user.isVerified = true;

	// Use $unset to remove the verifyCode field from the document in the database
	await user.updateOne({ $unset: { verifyCode: 1 } });

	// Save other changes like isVerified
	await user.save();

	const updatedUser = await userModel.findById(req.user._id);

	// Clear the token cookie
	res.clearCookie("token");

	return res.status(200).json(new ApiResponse(200, "User verified successfully", updatedUser));
});

export const loginUser = asyncHandler(async (req, res) => {
	try {
		const errors = validationResult(req);

		//if something if wrong the give error in routes comes in errors.array
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password, mobileNumber } = req.body;

		if ((!email || !mobileNumber) && !password) {
			throw new ApiError(400, "(Email or mobile number) and password is required");
		}

		const user = await userModel
			.findOne({
				$or: [{ email }, { mobileNumber }],
			})
			.select("+password");

		if (!user) {
			throw new ApiError(400, "User not found");
		}

		if (!user.isVerified) {
			throw new ApiError(400, "User is not verified");
		}

		console.log("h");

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			throw new ApiError(400, "Invalid password");
		}
		console.log("hs");

		const token = user.generateAuthToken(); //give id of user

		// Set token in cookie
		res.cookie("token", token, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});


		return res.status(200).json(new ApiResponse(200, "User logged in successfully", {user,token}));
	} catch (error) {
		throw new ApiError(400, "error in login", error.message);
	}
});

export const logoutUser = asyncHandler(async (req, res) => {
	res.clearCookie("token");
	return res.status(200).json(new ApiResponse(200, "User logged out successfully"));
});

export const getProfileUser = asyncHandler(async (req, res) => {
	return res.status(200).json(new ApiResponse(200, "User profile fetched successfully", req.user));
});

export const forgetPasswordUser = asyncHandler(async (req, res) => {
	try {
		const errors = validationResult(req);

		//if something if wrong the give error in routes comes in errors.array
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, mobileNumber } = req.body;

		if (!email && !mobileNumber) {
			throw new ApiError(400, "Email or mobile number is required");
		}

		const user = await userModel.findOne({
			$or: [{ email }, { mobileNumber }],
		});

		if (!user) {
			throw new ApiError(400, "User not found");
		}

		if (!user.isVerified) {
			throw new ApiError(400, "User is not verified");
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString();

		user.otp = otp;
		user.otpExpiry = Date.now() + 5 * 60 * 1000;
		await user.save();

		const username = `${user.fullname.firstname} ${user.fullname.lastname}`;
		const subject = "Forget Password";
		const message = `
        <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333; line-height: 1.6;">
                <p style="margin-bottom: 15px;">Dear ${username},</p>

                <p style="margin-bottom: 15px;">You recently requested to reset your password. Please use the One-Time Password (OTP) below to proceed with resetting your password:</p>

                <div style="text-align: center; margin: 25px 0;">
                    <h3 style="color: #4CAF50; background-color: #e8f5e9;
                              padding: 12px 24px; border-radius: 5px;
                              display: inline-block; margin: 0;
                              border: 2px dashed #81c784;">
                        ${otp}
                    </h3>
                </div>

                <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;
                          margin: 20px 0; border-radius: 4px;">
                    <p style="margin: 0; color: #856404;">
                        ⚠ This OTP is valid for the next <strong>10 minutes</strong>.
                        Please do not share this code with anyone.
                    </p>
                </div>

                <p style="margin-bottom: 15px; color: #6c757d;">
                    If you did not request a password reset, please ignore this email or
                    <a href="mailto:support@drivorides.com" style="color: #2196F3; text-decoration: none;">
                        contact our support team
                    </a> immediately.
                </p>

                <div style="border-top: 1px solid #e0e0e0; margin-top: 30px; padding-top: 20px;">
                    <p style="margin: 5px 0; font-size: 0.9em; color: #757575;">
                        Best regards,<br>
                        <strong style="color: #2e7d32;">Drivo Rides Support Team</strong>
                    </p>
                    <p style="margin: 5px 0; font-size: 0.8em; color: #9e9e9e;">
                        Need help? Reply to this email or call us at (555) 123-4567
                    </p>
                </div>
            </div>
        </div>
    `;

		await sendEmail(user.email, subject, message);

		return res.status(200).json(new ApiResponse(200, `OTP sent to ${user.email} for forget password successfully`));
	} catch (error) {
		throw new ApiError(400, "error in forget password", error.message);
	}
});

export const deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await userModel.findById(req.user._id);
		if (!user) {
			throw new ApiError(400, "User not found");
		}
		deleteOnCloudinary(user.profileImage);
		await user.deleteOne();
		res.clearCookie("token");
		return res.status(200).json(new ApiResponse(200, "User deleted successfully"));
	} catch (error) {
		throw new ApiError(400, "error in deleting user", error.message);
	}
});

// Update User
export const updateUser = async (req, res) => {
	const { fullname, address } = req.body;
	const user = await userModel.findById(req.user._id);
	console.log(req.body);

	if (!user) {
		throw new ApiError(400, "User not found");
	}

	// Check if fullname is provided and update firstname and lastname
	if (fullname) {
		if (fullname.firstname) {
			user.fullname.firstname = fullname.firstname;
		}

		// Create or update lastname if provided
		if (fullname.lastname) {
			user.fullname.lastname = fullname.lastname;
		}
	}

	// Update address if provided
	if (address) {
		user.address = address;
	}

	// Handle profile image update if provided
	if (req.file) {
		// If a new profile image is uploaded, delete the old one (if not default)
		if (user.profileImage !== process.env.DEFAULT_PROFILE_IMAGE_URL) {
			await deleteOnCloudinary(user.profileImage);
		}
		// Upload new image to Cloudinary
		const profileImage = await uploadOnCloudinary(req.file.path);
		user.profileImage = profileImage.url;
	}

	// Save the user with the updated details
	await user.save();

	// Send response with updated user details
	return res.status(200).json(new ApiResponse(200, "User updated successfully", user));
};

export const verifyotp = asyncHandler(async (req, res) => {
	try {
		const errors = validationResult(req);
		console.log(req.body);

		//if something if wrong the give error in routes comes in errors.array
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, mobileNumber, password, otp } = req.body;
		console.log("ddd", typeof otp);

		if (!email && !mobileNumber) {
			throw new ApiError(400, "Email or mobile number is required");
		}

		if (!otp) {
			throw new ApiError(400, "OTP is required");
		}

		const user = await userModel.findOne({
			$or: [{ email }, { mobileNumber }],
		});

		if (!user) {
			throw new ApiError(400, "User not found");
		}
		console.log("d");
		console.log(user);

		console.log("user otp", user.otp, "dd", otp);

		if (user.otp !== otp) {
			throw new ApiError(400, "Invalid OTP");
		}

		if (user.otpExpiry < Date.now()) {
			throw new ApiError(400, "OTP has expired");
		}
		console.log("e");

		user.otp = undefined;
		user.otpExpiry = undefined;

		const hashedPassword = await userModel.hashPassword(password);

		user.password = hashedPassword;

		await user.save();

		return res.status(200).json(new ApiResponse(200, "User password successfully updated"));
	} catch (error) {
		throw new ApiError(400, "error in forget password in otp", error.message);
	}
});
