import userModel from "../models/user.model.js"; 

const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({ fullname: { firstname, lastname }, email, password });

  return user;
};

export default createUser;