const express = require("express");
const app = express();

const fs = require("fs");
const yaml = require("js-yaml");
const xml = require("xml2js").parseString;

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

app.use('/docs/v1/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// read & parse files
let ymlContent = "";
let xmlContent = "";

try {
  // yml
  ymlContent = yaml.load(fs.readFileSync("../files/example.yml"));
  console.log(ymlContent);

  // xml
  xml(fs.readFileSync("../files/example.xml"), (err, result) => {
    xmlContent = result.content.anime;
    console.log(xmlContent);
  });
} catch (err) {
  console.log(err);
}

// endpoints
app.get("/yml", (req, res) => {
  res.send({ yml: ymlContent });
});

app.get("/xml", (req, res) => {
  res.send({ xml: xmlContent });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
