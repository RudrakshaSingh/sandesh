import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
   {
      fullname: {
         firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
            maxlength: [50, "First name must be at most 50 characters long"],
            trim: true,
            lowercase: true,
         },
         lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
            maxlength: [50, "Last name must be at most 50 characters long"],
            trim: true,
            lowercase: true,
         },
      },
      email: {
         type: String,
         required: true,
         unique: true,
         minlength: [5, "Email must be at least 5 characters long"],
         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
         trim: true,
         lowercase: true,
      },
      mobileNumber: {
         type: Number,
         required: true,
         unique: true,
         trim: true,
         maxlength: [10, "Mobile number must be at most 10 digits long"],
         minlength: [10, "Mobile number must be at least 10 digits long"],
      },
      password: {
         type: String,
         required: true,
         minlength: [6, "Password must be at least 6 characters long"],
         maxlength: [20, "Password must be at most 20 characters long"],
         select: false,
         validate: {
            validator: function (v) {
               return /(?=.*[A-Z])(?=.*[!@#$&*])/.test(v);
            },
            message: (props) => `${props.value} must contain at least one uppercase letter and one symbol`,
         },
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
      profileImage: {
         type: String,
         default:
            "https://banner2.cleanpng.com/20190211/eet/kisspng-computer-icons-scalable-vector-graphics-user-profi-login-user-name-svg-png-icon-free-download-21379-1713906519828.webp",
      },
      otp: {
         type: Number,
         select: false,
      },
      otpExpiresAt: {
         type: Date,
         select: false,
      },
      refreshToken: {
         type: String,
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
