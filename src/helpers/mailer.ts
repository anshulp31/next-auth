import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sentMail =async({email,emailType,userId}:any)=>{
        try {
            //todo configure mail for usage
            const hashedToken=await bcryptjs.hash(userId.toString(),10);
            if(emailType==="VERIFY"){
                await User.findByIdAndUpdate(userId,
                   {
                   $set: {
                        verifyToken:hashedToken,
                        verifyTokenExpiry:Date.now() + 3600000
                    }
                   }
                )
            }else if(emailType==="RESET"){
                await User.findByIdAndUpdate(userId,
                  {
                    $set:{
                        forgotPasswordToken:hashedToken,
                        forgotPasswordTokenExpiry:Date.now() + 3600000
                    }
                  }
                )
            }
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: "porwalaman731@gmail.com",
                    pass: "hwdeqbsixrrgfcne",
                  },
              });
              const mailOptions={
                from:"porwalaman731@gmail.com", // sender address
                to: email, // list of receivers
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>`
              }

              const mailresponse=await transporter.sendMail(mailOptions);
              return mailresponse;
        } catch (error) {
            console.log("Errom while sending mail",error)
        }
}