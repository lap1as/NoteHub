from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import re
import bcrypt


SECRET_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMTIzNzc1MiwiaWF0IjoxNzIxMjM3NzUyfQ.KHu7JZXhJ_sCrd-X07Bpmx5pnRYBalHE4xoo-2dsaus"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None

def validate_password(password: str) -> None:
    """Validate the password to ensure it meets the required criteria."""
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")
    if not re.search(r'[A-Z]', password):
        raise ValueError("Password must include at least one uppercase letter")
    if not re.search(r'[a-z]', password):
        raise ValueError("Password must include at least one lowercase letter")
    if not re.search(r'[0-9]', password):
        raise ValueError("Password must include at least one digit")
    

def get_password_hash(password: str) -> str:
    """Hash a password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')