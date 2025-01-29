import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, User, Mail, Key, Phone, MapPin,Camera } from "lucide-react";

function UserRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureImage=()=>{
    
  }
  const submitHandler = async (e) => {
    e.preventDefault();

    // Email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid Email");
      return;
    }

    // First Name validation
    if (firstName.length < 3) {
      alert("First name must be at least 3 characters long.");
      return;
    }

    if (firstName.length > 60) {
      alert("First name must be at most 60 characters long.");
      return;
    }

    // Last Name validation (optional)
    if (lastName && (lastName.length < 3 || lastName.length > 60)) {
      alert("Last name must be at least 3 characters long and at most 60 characters long.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password.length > 20) {
      alert("Password must be at most 20 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password) || !/[!@#$&*]/.test(password)) {
      alert("Password must contain at least one uppercase letter and one symbol.");
      return;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Mobile Number validation
    if (!/^\d{10}$/.test(mobileNumber)) {
      alert("Mobile number must be exactly 10 digits long.");
      return;
    }

    // Prepare the fullname object, add lastname only if provided
    const fullname = {
      firstname: firstName,
      ...(lastName && { lastname: lastName }),
    };

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("fullname", JSON.stringify(fullname));
    formData.append("mobileNumber", mobileNumber);
    formData.append("address", address);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      navigate("/users/otp");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 transform hover:scale-[1.01] transition-transform duration-300">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join us today and start your journey
          </p>
        </div>

        <form onSubmit={submitHandler} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Profile Image Upload */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="profileImage"
                className="relative group cursor-pointer"
              >
                <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 transition-transform duration-300 group-hover:scale-105 ${
                  previewUrl ? 'bg-transparent' : 'bg-gray-100'
                }`}>
                  {previewUrl ? (
                    <img
                      src={previewUrl}
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
              <div className="absolute z-10 mt-24 ml-20 bg-red-600 p-2" onClick={captureImage}><Camera  className=" text-amber-600" size={32}/></div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstname" className="sr-only">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-indigo-400"
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastname" className="sr-only">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}

export default UserRegister;