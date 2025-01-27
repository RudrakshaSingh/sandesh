import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserVerifyCode() {
	const [timer, setTimer] = useState(300); // 5 minutes in seconds
	const [code, setCode] = useState("");
	const navigate = useNavigate(); // Replace useHistory with useNavigate

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer === 1) {
					navigate("/users/register"); // Use navigate instead of history.push
				}
				return prevTimer > 0 ? prevTimer - 1 : 0;
			});
		}, 1000);

		return () => clearInterval(countdown);
	}, [navigate]); // Use navigate as a dependency

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/verifycode`, {
				verifyCode: code,
			},{
        withCredentials: true
      });
			console.log("Code verified:", response.data);
			// Redirect or handle success
		} catch (error) {
			console.error("Verification failed:", error.response?.data || error.message);
		}
	};

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
	};

	return (
		<div>
			<h1>Verify Code</h1>
			<p>Time remaining: {formatTime(timer)}</p>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Enter verification code"
					value={code}
					onChange={(e) => setCode(e.target.value)}
					required
				/>
				<button type="submit" disabled={timer === 0}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default UserVerifyCode;
