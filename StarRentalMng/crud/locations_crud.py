from database import database
from typing import Optional


async def get_locations(skip: int = 0, limit: int = 10):
    query = """
        SELECT
            location_id,
            Lname,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            country,
            phone_number,
            email,
            created_at,
            updated_at
        FROM locations
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={"limit": limit, "skip": skip})


async def get_location(location_id: int):
    query = """
        SELECT
            location_id,
            Lname,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            country,
            phone_number,
            email,
            created_at,
            updated_at
        FROM locations
        WHERE location_id = :location_id
    """
    row = await database.fetch_one(query=query, values={"location_id": location_id})
    return dict(row) if row else None


async def create_location(
    Lname: str,
    address_line1: str,
    address_line2: Optional[str],
    city: str,
    state: str,
    zip_code: int,
    country: str,
    phone_number: Optional[str],
    email: Optional[str],
) -> int:
    query = """
        INSERT INTO locations (
            Lname,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            country,
            phone_number,
            email,
            created_at,
            updated_at
        ) VALUES (
            :Lname,
            :address_line1,
            :address_line2,
            :city,
            :state,
            :zip_code,
            :country,
            :phone_number,
            :email,
            NOW(),
            NOW()
        )
    """
    location_id = await database.execute(query=query, values={
        "Lname": Lname,
        "address_line1": address_line1,
        "address_line2": address_line2,
        "city": city,
        "state": state,
        "zip_code": zip_code,
        "country": country,
        "phone_number": phone_number,
        "email": email,
    })
    return location_id


async def delete_location(location_id: int) -> int:
    query = "DELETE FROM locations WHERE location_id = :location_id"
    return await database.execute(query=query, values={"location_id": location_id})

async def update_location(
    location_id: int,
    Lname: str,
    address_line1: str,
    address_line2: Optional[str],
    city: str,
    state: str,
    zip_code: int,
    country: str,
    phone_number: Optional[str],
    email: Optional[str],
) -> int:
    query = """
        UPDATE locations SET
            Lname = :Lname,
            address_line1 = :address_line1,
            address_line2 = :address_line2,
            city = :city,
            state = :state,
            zip_code = :zip_code,
            country = :country,
            phone_number = :phone_number,
            email = :email,
            updated_at = NOW()
        WHERE location_id = :location_id
    """
    return await database.execute(query=query, values={
        "location_id": location_id,
        "Lname": Lname,
        "address_line1": address_line1,
        "address_line2": address_line2,
        "city": city,
        "state": state,
        "zip_code": zip_code,
        "country": country,
        "phone_number": phone_number,
        "email": email,
    })
