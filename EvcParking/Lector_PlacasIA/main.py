from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
from jwt import encode, decode, exceptions
from datetime import datetime, timedelta
from os import getenv

# Configuración básica
app = FastAPI()

# Claves y configuración JWT
SECRET_KEY = "supersecretkey"  # Cambia esto por una clave segura
ALGORITHM = "HS256"

# Estructura del usuario
class User(BaseModel):
    email: EmailStr
    password: str
    role: str = "regular"  # Default role

# Base de datos simulada
USERS_DB = [
    {"email": "admin", "password": "admin", "role": "admin"}
]

# Función para crear tokens JWT
def create_token(data: dict):
    payload = {
        **data,
        "exp": datetime.utcnow() + timedelta(hours=2)
    }
    return encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Función para validar tokens JWT
def verify_token(token: str):
    try:
        return decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except exceptions.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Rutas
@app.post("/api/login")
def login(user: User):
    # Verificar si el usuario existe
    for u in USERS_DB:
        if u["email"] == user.email and u["password"] == user.password:
            token = create_token({"email": u["email"], "role": u["role"]})
            return {"access_token": token, "role": u["role"]}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/protected/admin")
def admin_route(token: str = Header(None)):
    decoded_token = verify_token(token)
    if decoded_token["role"] != "admin":
        raise HTTPException(status_code=403, detail="Access denied")
    return {"message": "Welcome, Admin!"}
