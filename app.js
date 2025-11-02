const express = require("express");
require("dotenv").config();
const PORT = 4000;
const app = express();

//middleware start

app.set("view engine", "ejs");
//middleware end

app.get("/", (req, res) => {
  res.render("header");
});
app.listen(process.env.PORT || PORT, () =>
  console.log(`application is listening at port ${process.env.PORT}`),
);
