import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Timer, ArrowRight, Mail } from "lucide-react";

function UserVerifyCode() {
	const [timer, setTimer] = useState(300);
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const inputRefs = useRef([]);

	const navigate = useNavigate();

	const handleChange = (index, e) => {
		const value = e.target.value.replace(/\D/g, "");
		if (value) {
			const newOtp = [...otp];
			newOtp[index] = value.substring(value.length - 1);
			setOtp(newOtp);

			// Move to next input if available
			if (index < otp.length - 1) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		// Handle backspace
		if (e.key === "Backspace") {
			if (!otp[index] && index > 0) {
				const newOtp = [...otp];
				newOtp[index - 1] = "";
				setOtp(newOtp);
				inputRefs.current[index - 1].focus();
			} else {
				const newOtp = [...otp];
				newOtp[index] = "";
				setOtp(newOtp);
			}
			e.preventDefault();
		}
		// Handle left arrow
		else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1].focus();
		}
		// Handle right arrow
		else if (e.key === "ArrowRight" && index < otp.length - 1) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
		const pasteArray = pasteData.split("").slice(0, otp.length);

		if (pasteArray.length === otp.length) {
			setOtp(pasteArray);
			inputRefs.current[otp.length - 1].focus();
		}
	};

	useEffect(() => {
		const countdown = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer === 1) {
					navigate("/users/register");
				}
				return prevTimer > 0 ? prevTimer - 1 : 0;
			});
		}, 1000);

		return () => clearInterval(countdown);
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = otp.join("");

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/users/verifycode`,
				{
					verifyCode: verificationCode,
				},
				{
					withCredentials: true,
				}
			);
			if (response.status === 200) {
				navigate("/users/login");
				
			}
			console.log("Code verified:", response.data);
			// Handle successful verification
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
		<div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform hover:scale-[1.01] transition-all duration-300">
				<div className="flex flex-col items-center mb-8">
					<div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
						<Mail className="w-8 h-8 text-indigo-600" />
					</div>
					<h2 className="text-2xl font-bold text-gray-800 text-center">Verify Your Email</h2>
					<p className="text-gray-600 text-center mt-2">We've sent a verification code to your email</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex justify-center gap-2" onPaste={handlePaste}>
						{otp.map((digit, index) => (
							<input
								key={index}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								ref={(el) => (inputRefs.current[index] = el)}
								className="w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg
                          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                          outline-none transition-all duration-200
                          bg-gray-50 hover:bg-gray-100"
								autoFocus={index === 0}
							/>
						))}
					</div>

					<div className="flex items-center justify-center gap-2 text-gray-600">
						<Timer className="w-5 h-5" />
						<span className="font-medium">{formatTime(timer)}</span>
					</div>

					<button
						type="submit"
						disabled={timer === 0 || otp.some((digit) => !digit)}
						className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg
                     font-semibold tracking-wide
                     transform transition-all duration-300
                     hover:bg-indigo-700 hover:scale-[1.02]
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2">
						Verify Code
						<ArrowRight className="w-5 h-5" />
					</button>

					<p className="text-center text-sm text-gray-600">
						Didn't receive the code?{" "}
						<button
							type="button"
							className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
							onClick={() => {
								// Handle resend logic here
								setTimer(300);
							}}
							disabled={timer > 0}>
							Resend
						</button>
					</p>
				</form>
			</div>
		</div>
	);
}

export default UserVerifyCode;
