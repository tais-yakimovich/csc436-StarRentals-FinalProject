from database import database
from typing import List, Optional


# READ all vehicles with pagination
async def get_vehicles(skip: int = 0, limit: int = 10):
    query = """
        SELECT 
            VIN,
            license_plate,
            year,
            make,
            model,
            body_style,
            color,
            miles,
            rental_price,
            location_id,
            fuel_type,
            rental_status,
            photo_url
        FROM vehicles
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={"limit": limit, "skip": skip})


# READ one vehicle by VIN
async def get_vehicle(vin: str):
    query = """
        SELECT 
            VIN,
            license_plate,
            year,
            make,
            model,
            body_style,
            color,
            miles,
            rental_price,
            location_id,
            fuel_type,
            rental_status,
            photo_url
        FROM vehicles
        WHERE VIN = :vin
    """
    row = await database.fetch_one(query=query, values={"vin": vin})
    return dict(row) if row else None


# (Optional) READ vehicle with location name (JOIN)
async def get_vehicle_with_location(vin: str):
    """
    Fetch vehicle with location name for better UI display.
    JOIN: vehicles + locations on location_id.
    """
    query = """
        SELECT 
            v.VIN,
            v.license_plate,
            v.year,
            v.make,
            v.model,
            v.body_style,
            v.color,
            v.miles,
            v.rental_price,
            v.location_id,
            l.Lname AS location_name,
            v.fuel_type,
            v.rental_status,
            v.photo_url
        FROM vehicles v
        LEFT JOIN locations l ON v.location_id = l.location_id
        WHERE v.VIN = :vin
    """
    row = await database.fetch_one(query=query, values={"vin": vin})
    return dict(row) if row else None

async def get_vehicles_at_location(location_id: int) -> List[dict]:
    query = """
        SELECT 
            VIN,
            license_plate,
            year,
            make,
            model,
            body_style,
            color,
            miles,
            rental_price,
            location_id,
            fuel_type,
            rental_status,
            photo_url
        FROM vehicles
        WHERE location_id = :location_id
    """
    rows = await database.fetch_all(query=query, values={"location_id": location_id})
    return [dict(row) for row in rows]

async def get_vehicles_at_locations_date_range(location_id: int, start_date: str, end_date: str) -> List[dict]:
    query = """
        SELECT 
            v.VIN,
            v.license_plate,
            v.year,
            v.make,
            v.model,
            v.body_style,
            v.color,
            v.miles,
            v.rental_price,
            v.location_id,
            v.fuel_type,
            v.rental_status,
            v.photo_url
        FROM vehicles v
        WHERE v.location_id = :location_id
        AND v.VIN NOT IN (
            SELECT r.VIN
            FROM rental_info r
            WHERE (r.start_date <= :end_date AND r.return_date >= :start_date)
        )
    """
    rows = await database.fetch_all(query=query, values={
        "location_id": location_id,
        "start_date": start_date,
        "end_date": end_date
    })
    return [dict(row) for row in rows]

async def get_vehicles_filtered(location_id: list[int],
                                start_date: str, 
                                end_date: str, 
                                body_style: list[str], 
                                price_max: int, 
                                fuel_type: list[str]):
    
    location_id_list = ','.join([f":location_id_{i}" for i in range(len(location_id))])
    body_style_list = ','.join([f":body_style_{i}" for i in range(len(body_style))])
    fuel_type_list = ','.join([f":fuel_type_{i}" for i in range(len(fuel_type))])
    query = f"""
    SELECT *
    FROM vehicles v
    WHERE v.location_id IN ({location_id_list})
    AND v.VIN NOT IN (
        SELECT r.VIN
        FROM rental_info r
        WHERE (r.start_date <= :end_date AND r.return_date >= :start_date)
    )
    AND v.body_style IN ({body_style_list})
    AND v.rental_price <= :price_max
    AND v.fuel_type IN ({fuel_type_list})
    """

    values = {f"location_id_{i}": val for i, val in enumerate(location_id)}
    values["start_date"] = start_date
    values["end_date"] = end_date
    values.update({f"body_style_{i}": val for i, val in enumerate(body_style)})
    values["price_max"] = price_max
    values.update({f"fuel_type_{i}": val for i, val in enumerate(fuel_type)})

    rows = await database.fetch_all(query=query, values=values)
    return [dict(row) for row in rows]

# CREATE new vehicle
async def create_vehicle(
    VIN: str,
    license_plate: str,
    year: int,
    make: str,
    model: str,
    body_style: str,
    color: str,
    miles: int,
    rental_price: float,
    location_id: int,
    fuel_type: str,
    rental_status: str,
    photo_url: str,
) -> str:
    query = """
        INSERT INTO vehicles (
            VIN,
            license_plate,
            year,
            make,
            model,
            body_style,
            color,
            miles,
            rental_price,
            location_id,
            fuel_type,
            rental_status,
            photo_url
        )
        VALUES (
            :VIN,
            :license_plate,
            :year,
            :make,
            :model,
            :body_style,
            :color,
            :miles,
            :rental_price,
            :location_id,
            :fuel_type,
            :rental_status,
            :photo_url
        )
    """
    try:
        await database.execute(
            query=query,
            values={
                "VIN": VIN,
                "license_plate": license_plate,
                "year": year,
                "make": make,
                "model": model,
                "body_style": body_style,
                "color": color,
                "miles": miles,
                "rental_price": rental_price,
                "location_id": location_id,
                "fuel_type": fuel_type,
                "rental_status": rental_status,
                "photo_url": photo_url,
            },
        )
        return VIN
    except Exception as err:
        raise ValueError(f"Vehicle with VIN {VIN} already exists or invalid data. ({err})")


# UPDATE existing vehicle
async def update_vehicle(
    VIN: str,
    license_plate: str,
    year: int,
    make: str,
    model: str,
    body_style: str,
    color: str,
    miles: int,
    rental_price: float,
    location_id: int,
    fuel_type: str,
    rental_status: str,
    photo_url: str,
) -> bool:
    query = """
        UPDATE vehicles
        SET
            license_plate = :license_plate,
            year          = :year,
            make          = :make,
            model         = :model,
            body_style    = :body_style,
            color         = :color,
            miles         = :miles,
            rental_price  = :rental_price,
            location_id   = :location_id,
            fuel_type     = :fuel_type,
            rental_status = :rental_status,
            photo_url     = :photo_url
        WHERE VIN = :VIN
    """
    try:
        await database.execute(
            query=query,
            values={
                "VIN": VIN,
                "license_plate": license_plate,
                "year": year,
                "make": make,
                "model": model,
                "body_style": body_style,
                "color": color,
                "miles": miles,
                "rental_price": rental_price,
                "location_id": location_id,
                "fuel_type": fuel_type,
                "rental_status": rental_status,
                "photo_url": photo_url,
            },
        )
        return True
    except Exception as err:
        raise ValueError(f"Error updating vehicle {VIN}: {err}")


# DELETE one vehicle
async def delete_vehicle(vin: str) -> int:
    query = "DELETE FROM vehicles WHERE VIN = :vin"
    return await database.execute(query=query, values={"vin": vin})


# DELETE many vehicles
async def delete_vehicles(vins: list[str]) -> int:
    if not vins:
        return 0
    placeholders = ",".join(f":id{i}" for i in range(len(vins)))
    query = f"DELETE FROM vehicles WHERE VIN IN ({placeholders})"
    values = {f"id{i}": vin for i, vin in enumerate(vins)}
    return await database.execute(query=query, values=values)