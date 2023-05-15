from pymongo import MongoClient
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


class Book(BaseModel):
    id: int
    title: str
    author:str
    price:int
    publisher: str

def get_collection():
    client= MongoClient("mongodb://localhost:27017")
    DATABASE= 'mydata'
    collection = 'books'
    bc = client[DATABASE][collection]
    yield bc

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/books')
def add_book(b1: Book, bc= Depends(get_collection)):
    result= bc.insert_one(b1.dict())
    return 'Book added successfully'

@app.get('/api/books', response_model= List[Book])
def get_books(bc = Depends(get_collection)):
    books= list(bc.find())
    return books

@app.get('/api/books/{id}', response_model= Book)
def get_book(id: int, bc= Depends(get_collection)):
    b1= bc.find_one({'id': id})
    return b1

# uvicorn app:app --host 0.0.0.0 --port 8080