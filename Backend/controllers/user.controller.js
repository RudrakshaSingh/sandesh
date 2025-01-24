import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator"; //the validation in route,if it lead to to wrong value and need to perform action on it
import blackListTokenModel from "../models/blackListToken.model.js";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
   const errors = validationResult(req);
   

   //if something if wrong the give error in routes comes in errors.array
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const { fullname, email, password, confirmPassword, mobileNumber, address } = req.body;

   const isUserAlreadyExists = await userModel.findOne({ $or: [{ email }, { mobileNumber }] });
   if (isUserAlreadyExists) {
      throw new ApiError(400, "User email or mobilenumber already exists");
   }

  //  const profileImageLocalPath = req.file?.path;
  //  if (profileImageLocalPath) {
  //     const profileImage = await uploadOnCloudinary(profileImageLocalPath);
  //     if (!profileImage) {
  //        throw new ApiError(400, "Error uploading profile image");
  //     }
  //  }

   const hashedPassword = await userModel.hashPassword(password);

   try {
      const user = await userService.createUser({
         firstname: fullname.firstname,
         lastname: fullname.lastname,
         email,
         password: hashedPassword,
         confirmPassword,
         mobileNumber,
         address,
        //  profileImage:
        //     profileImage?.url ||
        //     "https://banner2.cleanpng.com/20190211/eet/kisspng-computer-icons-scalable-vector-graphics-user-profi-login-user-name-svg-png-icon-free-download-21379-1713906519828.webp",
      });

      const token = user.generateAuthToken(); //give id of user
      return res.status(201).json(
        new ApiResponse(true, "User created successfully", { token, user })
      );
   } catch (error) {
      throw new ApiError(400, "Internal Server Error  in registerUser", error);
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
