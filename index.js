const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/compiler", async (req, res) => {
  const { requestdata } = req.body;
  console.log(requestdata);

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "639e388a10msh3ccd60adff600b9p1f174djsn211b87c4474a",
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: {
      language: requestdata.language,
      version: "latest",
      code: requestdata.code,
      input: requestdata.input,
    },
  };

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: { result: response.data },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: { err: error },
    });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
