from pydantic import BaseModel
from typing import Optional


class Location(BaseModel):
    location_id: int
    name: str
    address_line1: str
    address_line2: Optional[str] = None
    city: str
    state: str
    zip_code: str
    country: str
    phone_number: Optional[str] = None
    created_at: Optional[str] = None
