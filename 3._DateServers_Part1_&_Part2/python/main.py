from fastapi import FastAPI
from datetime import datetime
import requests
from dateutil import parser

app = FastAPI()

# endpoints
# this fetches from node
@app.get("/")
def _():
  response = requests.get("http://localhost:3000/timestamp")
  date = parser.parse(response.json()['Date'])
  return { date }

# node fetches from here
@app.get("/timestamp")
def _(): 
  date = datetime.now()
  print(date)
  return {"Date": date}