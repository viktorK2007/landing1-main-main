const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

var server = express();

server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());

server.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});

server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "form_test@inbox.ru",
        pass: "14WGDKn7HiWmemjBQPEv",
      },
    });

    const { email, comment, name, phone } = req.body;
    const mail = {
      from: "form_test@inbox.ru",
      to: "ivanzagorin6@gmail.com",
      subject: "This letter was sent by nodemailer",
      text: `Name: ${name}\nMessage: ${comment}\nEmail: ${email}\nPhone: ${phone}`
    }

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    await transporter.sendMail(mail)
    return res.status(200).send({
      status: 200,
      message: "success"
    })

  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: "error",
    });
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
