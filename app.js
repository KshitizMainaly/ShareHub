const express = require("express");
require("dotenv").config();
const PORT = 4000;
const app = express();
app.get("/", (req, res) => {
  res.json({ message: "you are home " });
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`application is listening at port ${PORT}`),
);
