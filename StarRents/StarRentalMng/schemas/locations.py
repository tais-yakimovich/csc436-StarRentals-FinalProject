from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class Location(BaseModel):
    location_id: int
    Lname: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    zip_code: int
    country: str
    phone_number: Optional[str] = None
    email: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
