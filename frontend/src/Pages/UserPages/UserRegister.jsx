import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [address, setAddress] = useState("");
	const [profileImage, setProfileImage] = useState(null);

	const navigate = useNavigate();
	const submitHandler = async (e) => {
		e.preventDefault();

		if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
			alert("Please enter a valid email.");
			return;
		}

		if (firstName.length < 3) {
			alert("First name must be at least 3 characters long.");
			return;
		}

		if (lastName.length < 3) {
			alert("Last name must be at least 3 characters long.");
			return;
		}

		if (password.length < 6 || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
			alert("Password must be at least 6 characters long, with one uppercase letter and one symbol.");
			return;
		}

		if (password !== confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		if (!/^\d{10,}$/.test(mobileNumber)) {
			alert("Mobile number must be at least 10 digits long.");
			return;
		}

		const fullname = {
			firstname: firstName,
			lastname: lastName,
		};

		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);
		formData.append("confirmPassword", confirmPassword);
		formData.append("fullname", JSON.stringify(fullname));
		formData.append("mobileNumber", mobileNumber);
		formData.append("address", address);

		// Append the file only if it exists
		if (profileImage) {
			formData.append("profileImage", profileImage);
		}

		for (let [key, value] of formData.entries()) {
			console.log(`${key}:`, value); // Debug to ensure all fields are appended
		}

		try {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				 withCredentials: true, // Add this to send cookies with the request
			});
			console.log(response.data);
			navigate("/users/otp");
		} catch (error) {
			console.error(error.response?.data || error.message);
		}
	};

	return (
		<div>
			<form
				onSubmit={(e) => {
					submitHandler(e);
				}}
				className="flex flex-col items-center justify-center m-10 gap-3">
				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="profileImage">Profile Image:</label>
					<input
						id="profileImage"
						type="file"
						accept="image/*" // Ensure only images are accepted
						onChange={(e) => setProfileImage(e.target.files[0])}
					/>
				</div>

				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="email">Email:</label>
					<input
						id="email"
						value={email}
						type="email"
						placeholder="exampleEmail"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="firstname">firstname:</label>
					<input
						id="firstname"
						value={firstName}
						type="text"
						placeholder="exampleName"
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>

				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="lastname">Lastname:</label>
					<input
						id="lastname"
						value={lastName}
						type="text"
						placeholder="exampleNameLast"
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="password">Password:</label>
					<input
						id="password"
						value={password}
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="confirmPassword">confirmPassword:</label>
					<input
						id="confirmPassword"
						value={confirmPassword}
						type="password"
						placeholder="confirmPassword"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>

				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="address">address:</label>
					<input
						id="address"
						value={address}
						type="text"
						placeholder="address"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>

				<div className="bg-gray-300 flex gap-4">
					<label htmlFor="mobileNumber">mobileNumber:</label>
					<input
						id="mobileNumber"
						value={mobileNumber}
						type="text"
						placeholder="mobileNumber"
						onChange={(e) => setMobileNumber(e.target.value)}
					/>
				</div>

				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default UserRegister;
