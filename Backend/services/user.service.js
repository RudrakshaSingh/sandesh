import userModel from "../models/user.model.js"; 

const createUser = async ({ firstname, lastname, email, password, confirmPassword, address, profileImage, mobileNumber }) => {
  if (!firstname || !email || !password || !confirmPassword || !address || !mobileNumber) {
    throw new Error("All fields except profileImage are required");
  }
  
  // Convert mobileNumber to number
  if (typeof mobileNumber === "string") {
    mobileNumber = Number(mobileNumber);
  }

  const user = userModel.create({ fullname: { firstname, lastname }, email, password, confirmPassword, address, profileImage, mobileNumber });

  return user;
};

export default createUser;