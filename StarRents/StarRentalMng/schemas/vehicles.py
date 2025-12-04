from pydantic import BaseModel
from typing import Optional


class Vehicle(BaseModel):
    VIN: str
    license_plate: str
    year: int
    make: str
    model: str
    body_style: str
    color: str
    miles: int
    rental_price: float
    location_id: int
    fuel_type: str
    rental_status: str
    photo_url: str

class VehicleFilters(BaseModel):
    body_style: list[str]
    location_id: list[int]
    fuel_type: list[str]
