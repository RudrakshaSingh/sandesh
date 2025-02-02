import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Upload, User, Mail, Key, Phone, MapPin, Camera } from "lucide-react";
import Webcam from "react-webcam";

// Constants
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function UserRegister() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    profileImage: null,
    previewUrl: "",
    showWebcam: false,
    capturedImage: false,
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
          previewUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapturePhoto = (getScreenshot) => {
    try {
      const imageSrc = getScreenshot();
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          setFormData((prev) => ({
            ...prev,
            capturedImage: imageSrc,
            previewUrl: imageSrc,
            profileImage: blob,
            showWebcam: false,
          }));
        });
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();


    const fullname = {
      firstname: formData.firstName,
      ...(formData.lastName && { lastname: formData.lastName }),
    };

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("fullname", JSON.stringify(fullname));
    data.append("mobileNumber", formData.mobileNumber);
    data.append("address", formData.address);

    if (formData.profileImage) {
      data.append("profileImage", formData.profileImage);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/users/otp");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-gradient-to-r from-red-300 to-yellow-300">
      {/* Left Section: Registration Form */}
      <div className="min-h-screen   py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto space-y-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Join us today and start your journey</p>
          </div>

          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              {/* Profile Image Upload */}
              <div className="flex items-center justify-center w-full">
                <label htmlFor="profileImage" className="relative group cursor-pointer">
                  <div
                    className={`w-32 h-32 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 ${
                      formData.previewUrl ? "bg-transparent" : "bg-gray-100"
                    }`}
                  >
                    {formData.previewUrl ? (
                      <img
                        src={formData.previewUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm">Change Photo</p>
                    </div>
                  </div>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                <div
                  className="absolute z-10 mt-24 ml-20 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => setFormData((prev) => ({ ...prev, showWebcam: true }))}
                >
                  <Camera className="text-blue-500" size={24} />
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="sr-only">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                      placeholder="First Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="sr-only">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                  placeholder="Email address"
                />
              </div>

              {/* Password Fields */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                  placeholder="Password"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                  placeholder="Confirm Password"
                />
              </div>

              {/* Mobile Number */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="mobileNumber"
                  type="text"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                  placeholder="Mobile Number"
                />
              </div>

              {/* Address */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                  placeholder="Address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-[1.02]"
              >
                Register
              </button>
            </div>
            <p className="mt-2 text-gray-600 text-center font-semibold text-1xl">Already have an account? <span><Link to={"/users/login"} className="text-blue-600">Login now</Link></span></p>
            
          </form>
        </div>
      </div>

      {/* Right Section: Webcam */}
      <div className="hidden lg:flex items-center justify-center p-8">
        {formData.showWebcam && (
          <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <Webcam
              audio={false}
              height={480}
              screenshotFormat="image/jpeg"
              width={640}
              videoConstraints={videoConstraints}
              className="rounded-lg shadow-md"
            >
              {({ getScreenshot }) => (
                <button
                  onClick={() => handleCapturePhoto(getScreenshot)}
                  className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
                >
                  Capture Photo
                </button>
              )}
            </Webcam>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserRegister;