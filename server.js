var express = require("express");
var cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");

const CLIENT_ID = "bdab59be87aa69a37d64";
const CLIENT_SECRET = "99450b123666c0befcd2bb5ac7eb9f6d448a5e75";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async (req, res) => {
  console.log("CODE: ", req.query.code);
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.listen(4000, () => {
  console.log("Server runing on port 4000");
});
