const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 4000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("성공시 체크하기");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;

//squelize 환경구축하고
//연결할떄 DB
