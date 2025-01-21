import userModel from '../models/user.model.js';
import userService from '../services/user.service.js';
import { validationResult } from 'express-validator';//the validation in route,if it lead to to wrong value and need to perform action on it
const blackListTokenModel = require("../models/blackListToken.model");

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  //if something if wrong the give error in routes comes in errors.array
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });
  if (isUserAlreadyExists) {
      return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken(); //give id of user

  res.status(201).json({ token, user });
};

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

export const getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);//taken from token in middleware
};

//logout user
export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });//dont need to send createdat
  
  res.status(200).json({ message: "Logged out successfull" });
};