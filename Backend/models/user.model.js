import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
   {
      fullname: {
         firstname: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
         },
         lastname: {
            type: String,
            trim: true,
            lowercase: true,
         },
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
      confirmPassword: {
         type: String,
         required: true,
         validate: {
            validator: function (v) {
               return v === this.password;
            },
            message: "Passwords do not match",
         },
      },
      address: {
         type: String,
         trim: true,
      },
      profileImage: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

//instance methods are used to create a method that can be called on a specific document
userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" }); //expire time for blacklisting schema
   return token;
};

//instance methods are used to create a method that can be called on a specific document
userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password);
};

//static method is used to create a method that can be called on the model
userSchema.statics.hashPassword = async function (password) {
   return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;