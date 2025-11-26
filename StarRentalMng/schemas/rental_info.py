from pydantic import BaseModel
from datetime import date

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
    payment_id: int