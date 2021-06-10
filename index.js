const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
let item = [];
let work = [];
app.get("/", function (req, res) {
  var date = new Date();
  var option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = date.toLocaleString("hi-IN", option);
  res.render("todo", { listTitle: day, newItem: item });
});
app.post("/", function (req, res) {
  console.log(req.body.list);
  if (req.body.list === "Work") {
    work.push(req.body.data);
    res.redirect("/work");
  } else {
    item.push(req.body.data);
    res.redirect("/");
  }
});
app.get("/work", function (req, res) {
  res.render("todo", { listTitle: "Work", newItem: work });
});
app.post("/work", function (req, res) {
  work.push(req.body.data);
  res.redirect("/work");
});
app.listen(3000, function () {
  console.log("server is running at port 3000");
});
