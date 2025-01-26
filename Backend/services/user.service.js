import userModel from "../models/user.model.js"; 

const createUser = async ({ firstname, lastname, email, password, address, profileImage, mobileNumber,verifyCode }) => {
  if (!firstname || !email || !password  || !address || !mobileNumber) {
    throw new Error("All fields except profileImage are required");
  }

  const user = userModel.create({ fullname: { firstname, lastname }, email, password, address, profileImage, mobileNumber,verifyCode });

  return user;
};

export default createUser;