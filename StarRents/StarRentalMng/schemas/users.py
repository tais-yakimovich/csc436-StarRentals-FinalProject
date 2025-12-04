from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class User(BaseModel):
    user_id: int
    username: str
    password_hash: str
    phone_number: str
    first_name: str
    last_name: str
    date_of_birth: str                     # VARCHAR(50) in SQL
    driver_license_number: int
    driver_license_state: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    zip_code: int
    country: str
    created_at: Optional[datetime] = None  # TIMESTAMP default set by DB

class UserID(BaseModel):
    user_id: int