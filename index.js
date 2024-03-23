const express = require("express");
const app = express();
const cors = require("cors");
const env = require("dotenv").config();

const PORT = process.env.PORT;

// .use is an express function used to mount express middleware
// middleware have access to req and res
app.use(cors());

//express.json parses incoming requests with json payloads
// makes the app automatically parse JSON data from requests making it accessible by req.body
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
