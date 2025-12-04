from pydantic import BaseModel
from typing import Optional


class PaymentInfo(BaseModel):
    payment_id: int
    cardholder_name: str
    card_number: str
    exp_month: str
    exp_year: str
    cvv: str
    billing_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    user_id: Optional[int] = None

class PaymentID(BaseModel):
    payment_id: int