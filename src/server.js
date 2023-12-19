const proffys = [
  {
    name: "jackson",
    avatar: "https://github.com/JacksonJLGravino.png",
    whatsapp: "123456789",
    bio: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
    culpa ducimus, voluptatibus, eos adipisci animi nihil velit
    sapiente, aliquam minima blanditiis. Ea ducimus neque veritatis
    maiores expedita illo nam saepe`,
    subject: "matematica",
    cost: "20,00",
    weekday: 0,
    time_from: [720],
    time_to: [1220],
  },
];

const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "História",
  "Matemática",
  "Português",
  "Química",
];

const weekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

function getSubject(subjectNumber) {
  const position = +subjectNumber - 1;
  return subjects[position];
}

function PageLanding(req, res) {
  return res.render("index.html");
}

function PageStudy(req, res) {
  const filters = req.query;
  return res.render("study.html", { proffys, filters, subjects, weekdays });
}

function PageGiveClasses(req, res) {
  const data = req.query;

  const isNotEmpty = Object.keys(data).length > 0;
  if (isNotEmpty) {
    proffys.push(data);

    data.subject = getSubject(data.subject);

    return res.redirect("/study");
  }
  return res.render("give-classes.html", { subjects, weekdays });
}

server
  .use(express.static("public"))

  .get("/", PageLanding)
  .get("/study", PageStudy)
  .get("/give-classes", PageGiveClasses)
  .listen(5500);
