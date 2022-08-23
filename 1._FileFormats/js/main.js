const express = require("express");
const app = express();

const fs = require("fs");
const yaml = require("js-yaml");
const xml = require("xml2js").parseString;

// read & parse files

try {
  // yml
  const ymlContent = yaml.load(fs.readFileSync("../files/example.yml"));
  console.log(ymlContent);

  // xml
  xml(fs.readFileSync("../files/example.xml"), (err, result) => {
    console.log(result.content.anime);
  });
} catch (err) {
  console.log(err);
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
