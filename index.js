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
	console.log("hello");
  const { requestdata } = req.body;
  console.log(requestdata);

  const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
		  'x-rapidapi-key': '37865f47e8msh2c05a16552d6bd0p19b7e9jsn82286e02a65f',
		  'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
		  'Content-Type': 'application/json'
	  },
    data: {
      language: requestdata.language,
      version: "latest",
      code: requestdata.code,
      input: requestdata.input,
    },
  };

	console.log(options);

  try {
    const response = await axios.request(options);
    return res.status(200).json({
      data: { result: response.data },
    });
	  console.log(response.data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      data: { err: error, key:"37865f47e8msh2c05a16552d6bd0p19b7e9jsn82286e02a65f" },
    });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
