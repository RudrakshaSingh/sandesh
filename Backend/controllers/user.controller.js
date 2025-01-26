import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator"; //the validation in route,if it lead to to wrong value and need to perform action on it
import blackListTokenModel from "../models/blackListToken.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  uploadOnCloudinary  from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import createUser from "../services/user.service.js";

export const registerUser = asyncHandler(async (req, res) => {
   console.log("Request Body:", req.body); // Add this line for debugging
   const errors = validationResult(req);

   //if something if wrong the give error in routes comes in errors.array
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { fullname, email, password, confirmPassword, address} = req.body;

   const isUserAlreadyExists = await userModel.findOne({email});
   if (isUserAlreadyExists) {
      throw new ApiError(400, "User email already exists");
   }

   if (password !== confirmPassword) {
      throw new ApiError(400, "Password and confirm password do not match");
   }

   const hashedPassword = await userModel.hashPassword(password);

   // Correct ProfileImage path (use req.file)
   const ProfilePictureLocalPath = req.file?.path;
   if (!ProfilePictureLocalPath) {
     return res.status(400).json({ error: "Profile picture is required" });
   }
    // Upload to Cloudinary
   const profileImage = await uploadOnCloudinary(ProfilePictureLocalPath);
    if (!profileImage) {
      return res.status(400).json({ error: "Error uploading profile picture" });
    }

   try {
      console.log("h");
      console.log(profileImage.url);
      
      
      const user = await createUser({
         firstname: fullname.firstname,
         lastname: fullname.lastname,
         email,
         password: hashedPassword,
         confirmPassword:hashedPassword,
         address,
         profileImage: profileImage.url,
      });
      console.log("hd");


      const token = user.generateAuthToken(); //give id of user
      return res.status(201).json(
        new ApiResponse(201, "User created successfully", { token, user })
      );
   } catch (error) {
      throw new ApiError(400,"error in registering", error.message);
   }
});

// export const loginUser = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email }).select("+password");
//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const token = user.generateAuthToken();

//   res.cookie("token", token);

//   res.status(200).json({ token, user });
// };

// export const getUserProfile = async (req, res, next) => {
//   res.status(200).json(req.user);//taken from token in middleware
// };

// //logout user
// export const logoutUser = async (req, res, next) => {
//   res.clearCookie("token");
//   const token = req.cookies.token || req.headers.authorization.split(" ")[1];

//   await blackListTokenModel.create({ token });//dont need to send createdat

//   res.status(200).json({ message: "Logged out successfull" });
// };