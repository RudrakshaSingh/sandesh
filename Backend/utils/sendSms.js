import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSms = async (userMobileNumber = "+919999057399", firstname, lastname = " ", verifyCode) => {
	console.log("Sending message...");
	try {
		client.messages
			.create({
				body: `Hey! ${firstname} ${lastname} your verification code for registration is ${verifyCode}.`,
				messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICES_ID,
				to: "+919999057399",
			})
			.then((message) => console.log(message.sid));
	} catch (error) {
		console.error("Error sending SMS:", error.code, error.message);
	}
};

export default sendSms;
