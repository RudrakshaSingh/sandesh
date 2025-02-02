import blacklistTokenModel from "../models/blackListToken.model.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		console.log("token", token);
		

		if (!token) {
			return res.status(401).json({ message: "Unauthorized ff" });
		}

		const backlisted = await blacklistTokenModel.findOne({ token });
		if (backlisted) {
			return res.status(401).json({ message: "Unauthorized.token is blacklisted" });
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET); //as id is given in user model while generating token we get id by decoding
		const user = await userModel.findById(decodedToken._id);

		req.user = user; // taking it in response in controller
		if (!user) {
			return res.status(401).json({ error: "Unauthorized.no user found by email" });
		}

		return next();
	} catch (err) {
		return res.status(401).json({ message: "Server error middleware" });
	}
};

export default authUser;
