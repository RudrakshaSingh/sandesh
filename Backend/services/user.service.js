import userModel from "../models/user.model.js"; 

const createUser = async ({ firstname, lastname, email, password, confirmPassword, address, profileImage }) => {
  if (!firstname || !email || !password || !confirmPassword ) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({ fullname: { firstname, lastname }, email, password, confirmPassword, address, profileImage });

  return user;
};

export default createUser;