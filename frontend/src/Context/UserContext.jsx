import { createContext, useState } from "react";

export const UserDataContext = createContext();

function UserContext({ children }) {
	const [user, setUser] = useState({
		fullname: {
			firstname: "",
			lastname: "",
		},
		email: "",
		password: "",
		mobileNumber: "",
		address: "",
		profileImage: "",
	});
	return <UserDataContext.Provider value={{ user, setUser }}>{children}</UserDataContext.Provider>;
}

export default UserContext;
