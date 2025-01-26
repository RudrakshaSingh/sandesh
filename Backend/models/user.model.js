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
      mobileNumber: {
         type:Number,
         required: true,
      },
      verifyCode: {
         type: Number,
         select: false,

      },
      isVerified: {
         type: Boolean,
         default: false,
         select: false,
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
userSchema.post('save', function () {
   const user = this;  // Access the current user instance

   console.log("deleteUserIfNotVerified started");

   // Set timeout for 1 minute (60,000 ms)
   setTimeout(async () => {
     if (!user.isVerified) {
       // Use the deleteOnCloudinary function to delete the image
       try {
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
     }
   }, 60000); // 1 minute in milliseconds
});



const userModel = mongoose.model("user", userSchema);

export default userModel;