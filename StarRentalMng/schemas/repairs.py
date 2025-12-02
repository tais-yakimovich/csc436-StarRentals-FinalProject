from pydantic import BaseModel

class Repairs(BaseModel):
    repair_id: int
    repair_description: str
    VIN: str
    location_id: int

class RepairID(BaseModel):
    repair_id: int