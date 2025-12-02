from pydantic import BaseModel
from datetime import date
from typing import Optional

class RentalInfo(BaseModel):
    rental_id: int
    start_mileage: int
    return_mileage: int
    start_date: date
    return_date: date
    VIN: str
    user_id: int
    pickup_location_id: int
    dropoff_location_id: int
    payment_id: Optional[int] = None

class RentalID(BaseModel):
    rental_id: int