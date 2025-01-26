import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator"; //the validation in route,if it lead to to wrong value and need to perform action on it
import blackListTokenModel from "../models/blackListToken.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import createUser from "../services/user.service.js";

export const registerUser = asyncHandler(async (req, res) => {
	const errors = validationResult(req);

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
         verifyCode
		});

      user.deleteUserIfNotVerified();

      // Remove verifyCode before sending the response
      const userObject = user.toObject();
      delete userObject.verifyCode;

		console.log("hd");

		const token = user.generateAuthToken(); //give id of user
		return res.status(201).json(new ApiResponse(201, "User created successfully", { token, user:userObject }));
	} catch (error) {
		throw new ApiError(400, "error in registering", error.message);
	}
});

export const verifyCodeVerificationUser = asyncHandler(async (req, res) => {
	const { mobileNumber, verifyCode } = req.body;
	const user = await userModel.findOne({ mobileNumber }).select('+verifyCode');
	if (!user) {
		throw new ApiError(400, "User mobile number not found");
	}
   
	if (user.verifyCode !== verifyCode) {
      
		throw new ApiError(400, "Invalid OTP");
	}
	user.isVerified = true;

	 // Use $unset to remove the verifyCode field from the document in the database
    await user.updateOne({ $unset: { verifyCode: 1 } });

    // Save other changes like isVerified
    await user.save();

	const updatedUser = await userModel.findOne({ mobileNumber });


	return res.status(200).json(new ApiResponse(200, "User verified successfully",updatedUser));
});
