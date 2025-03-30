import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

function createEmailTemplate(name, email, phone, message) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        h1 {
          color: #2c3e50;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          color: #34495e;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Contact Form Submission</h1>
        <div class="field">
          <p class="label">Name:</p>
          <p>${name}</p>
        </div>
        <div class="field">
          <p class="label">Email:</p>
          <p>${email}</p>
        </div>
        <div class="field">
          <p class="label">Phone:</p>
          <p>${phone || "Not provided"}</p>
        </div>
        <div class="field">
          <p class="label">Message:</p>
          <p>${message}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "vyasvishal.dev@gmail.com",
      subject: "New Contact Form Submission",
      html: createEmailTemplate(name, email, phone, message),
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: "Email sent successfully" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}