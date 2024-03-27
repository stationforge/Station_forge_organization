import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: any) {
  // const resend = new Resend(process.env.PUBLIC_EMAIL_ID);
  const data = await req.json();
  console.log(data.email);

  const u_r_l = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/"
  }admin/chats`;
  const message = {
    from: data.email,
    to: [...data.email, "davisisibor@gmail.com"],
    subject: "New Customer Service request from " + data.name,
    text: data.name,
    html: ` <h1>New Customer Service Request</h1>
    <p>Hello Moderators,</p>
    <p>A new customer service request has been submitted from our website. Here are the details:</p>
    <p><strong>Client Name:</strong> ${data.name}</p>
 
    <p>Please log in to the moderator ${u_r_l} chat portal to address this request.</p>
    <p>Best regards,<br/>YStaion forge team</p> `,
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PUBLIC_EMAIL_ID,
      pass: process.env.PUBLIC_EMAIL_ID_KEY,
    },
  });

  return await transporter
    .sendMail(message)
    .then((response: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { error: false, emailSent: true, errors: [], response },
        { status: 200 },
      );
    })
    .catch((error: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { error: true, emailSent: false, errors: [error] },
        { status: 500 },
      );
    });
}
