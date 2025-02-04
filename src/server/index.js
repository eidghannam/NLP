var path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.static("dist"));

app.use(express.json());
console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/analyze", async function (req, res) {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ status: { code: "1", msg: "No URL provided" } });
  }

  const formdata = new URLSearchParams();
  formdata.append("key", process.env.API_KEY);
  formdata.append("url", url);
  formdata.append("lang", "en");

  try {
    const apiResponse = await fetch(
      "https://api.meaningcloud.com/sentiment-2.1",
      {
        method: "POST",
        body: formdata,
        redirect: "follow",
      }
    );
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: { code: "1", msg: "Server error" } });
  }
});

app.listen(8082, function () {
  console.log("Example app listening on port 8082!");
});
