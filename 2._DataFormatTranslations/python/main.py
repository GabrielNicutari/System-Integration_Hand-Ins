from fastapi import FastAPI
import json
import csv

app = FastAPI()

# json
jsonFile = open('../files/example.json')
jsonData = json.load(jsonFile)
jsonFile.close()

# csv
csvFile = open('../files/example.csv')
csvData = csv.DictReader(csvFile)

jsonArray = []

for row in csvData:
  jsonArray.append(row)

csvFile.close()

# endpoints
@app.get("/json")
def _(): 
  return {"JSON": jsonData}

@app.get("/csv")
def _():
    return {"CSV": jsonArray }




