from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
   
    "*",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def check_duplicate_username(username):
    # Check if username already exists in the file
    with open("users.txt", "r") as file:
        for line in file:
            if line.strip().split(',')[0] == username:
                return True
    return False

def check_duplicate_phonenumber(phonenumber):
    # Check if phone number already exists in the file
    with open("users.txt", "r") as file:
        for line in file:
            if line.strip().split(',')[3] == phonenumber:
                return True
    return False

def save_user_to_file(user):
    # Save user data to a file
    with open("users.txt", "a") as file:
        file.write(f"{user.username},{user.email},{user.password},{user.phonenumber}\n")
class User(BaseModel):
    username: str
    email: str
    password: str
    phonenumber: str

@app.post("/user")
async def create_user(user: User):
    
    if check_duplicate_username(user.username):
        return {"message": "Duplicate Username"}
    
    elif check_duplicate_phonenumber(user.phonenumber):
        return {"message": "Duplicate Phone number"}
    # Save user data to a file
    save_user_to_file(user)
    print(f"Received user data: {user}")
    return {"message": "User created successfully"}
