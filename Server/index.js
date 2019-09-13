const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

const app = express();

// body parser
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// server socket
const server = http.createServer(app);
const io = socket(server);

// email e server que enviará
const transporter = nodemailer.createTransport({
  host: "mail.server.com.br", // seu server aqui
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "email@email.com.br",
    pass: 'sua senha' // aqui vc tem que colocar sua senha, de alguma forma vai ter que criptografar
  },
  tls: { rejectUnauthorized: false }
});

// mensagem do e-mail
const mailOptions = {
  from: "contato@w4e.com.br", // quem envia
  to: "bruversfelipe@gmail.com", // para quem, pode passar uma vírgula para mais de um email: "email1, email2"
  subject: "Vencimento!", // assunto
  text: "Mensagem enviada do scheduler feito em node." // mensagem
};

// enviando e-mail
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log("erro", error);
  } else {
    console.log("Email enviado: " + info.response);
  }
});

// scheduler
schedule.Invocation();

let mensagem = {
  title: "",
  message: ""
};

schedule.scheduleJob("*/10 * * * * *", function() {
  mensagem = {
    title: "Notificação Automática",
    message: "Essa notificação deverá aparecer a cada 10 segundos"
  };
  io.emit("NEW_MENSAGEM", mensagem);
});

server.listen(1234);
