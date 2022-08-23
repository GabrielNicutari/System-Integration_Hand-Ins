import json
import csv

# json
jsonFile = open('../files/example.json')
jsonData = json.load(jsonFile)

print(jsonData)

jsonFile.close()

# csv
csvFile = open('../files/example.csv')
csvData = csv.reader(csvFile)

for lines in csvData:
  print(lines)
