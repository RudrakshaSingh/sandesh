import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import deleteOnCloudinary from "../utils/deleteOnCloudinary.js";

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
      address: {
         type: String,
         trim: true,
      },
      profileImage: {
         type: String,
         required: true,
      },
      mobileNumber: {
         type:String,
         required: true,
      },
      verifyCode: {
         type: String,
         select: false,
      },
      isVerified: {
         type: Boolean,
         default: false,
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

// Post-save hook to delete user and image if not verified
userSchema.methods.deleteUserIfNotVerified = async function () {
   console.log("deleteUserIfNotVerified started");

   // Set timeout for 1 minute (60,000 ms)
   setTimeout(async () => {
      const user = await userModel.findById(this._id);
      // Check if user is already verified
      if (!user.isVerified) {
         try {
            // Use the deleteOnCloudinary function to delete the image
            const deleteResponse = await deleteOnCloudinary(user.profileImage);  // Use the imported function
            console.log(`Profile image deleted from Cloudinary: ${deleteResponse}`);
         } catch (error) {
            console.error("Error deleting image from Cloudinary:", error);
         }

         // Delete the user document using deleteOne (recommended over remove)
         try {
            await user.deleteOne(); // Changed from remove() to deleteOne()
            console.log(`User ${user.email} deleted due to non-verification.`);
         } catch (error) {
            console.error("Error deleting user:", error);
         }
      } else {
         console.log(`User ${user.email} is verified, no need for deletion.`);
      }
   }, 300000); // 5 minute in milliseconds
};


const userModel = mongoose.model("user", userSchema);

export default userModel;