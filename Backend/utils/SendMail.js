import nodemailer from "nodemailer";

//create a transporter object using SMTP
const sendEmail = async function (email, subject, message) {
    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        secure:true,
        auth: {
            user: process.env.NODEMAILER_SMTP_MAIL,
            pass: process.env.NODEMAILER_SMTP_PASSWORD,
        }, 
    });
//Setup email data

    let mailDetails = {
        from: "rudrakshasingh785.com",
        to: email,
        subject: subject,
        html: message,
    };
    
    // send mail
    await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            console.log("Email sent successfully",data.response);
        }
    });
};
export default sendEmail;