/* eslint-disable react/prop-types */
import { LogOut, MessagesSquare, User } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function DropDown(props) {
	const navigate = useNavigate();

	const HandleLogout = async () => {
		const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
			withCredentials: true,
		});
		if (response.status === 200) {
			console.log("logout success");
			navigate("/users/login");
		}
		console.log("logout success");
	};
 const HandleDelete = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/delete`, {
	withCredentials: true,
  });
  if (response.status === 200) {
	console.log("delete success");
	navigate("/users/login");
  }
 }
	return (
		<div
			onMouseLeave={() => {
				props.setHover(false);
			}}
			className="absolute top-18 right-10 flex  space-y-3">
			<ul className="space-y-3  flex flex-col items-center justify-center">
				<div className="flex gap-4  items-center justify-center" onClick={() => setProfile(!Profile)}>
					<User className="text-blue-500 bg-blue-200 p-2 rounded-lg " size={36} />
					<li><Link to={"/users/"}>My Profile</Link></li>
				</div>

				<div className="flex gap-4  items-center justify-center">
					<MessagesSquare className="text-green-500 bg-green-200 p-2 rounded-lg " size={36} />
					<li>Feedback</li>
				</div>
				<div className="flex gap-3  items-center justify-center" onClick={HandleLogout}>
					<LogOut className="text-orange-500 bg-orange-200 p-2 rounded-lg relative right-2" size={36} />
					<li>Logout</li>
				</div>
				<div className="flex gap-3  items-center justify-center" onClick={HandleDelete}>
					<LogOut className="text-red-500 bg-red-200 p-2 rounded-lg relative right-2" size={36} />
					<li>Delete Account</li>
				</div>
			</ul>
		</div>
	);
}

export default DropDown;
