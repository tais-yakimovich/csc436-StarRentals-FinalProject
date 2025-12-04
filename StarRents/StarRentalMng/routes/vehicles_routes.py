from fastapi import APIRouter, HTTPException, Body, Query
from database import database
from schemas.vehicles import Vehicle, VehicleFilters
from crud.vehicles_crud import (
    get_vehicles,
    get_vehicle,
    create_vehicle,
    update_vehicle,
    delete_vehicle,
    get_vehicles_at_location,
    get_vehicles_at_locations_date_range,
    get_vehicles_filtered
)

router = APIRouter(prefix="/api/vehicles", tags=["Vehicles"])


@router.get("/", response_model=list[Vehicle])
async def api_get_vehicles(skip: int = 0, limit: int = 10):
    
        rows = await get_vehicles(skip, limit)
        return [Vehicle(**dict(r)) for r in rows]


@router.get("/{vin}", response_model=Vehicle)
async def api_get_vehicle(vin: str):
    
        v = await get_vehicle(vin)
        if not v:
            raise HTTPException(404, "Vehicle not found")
        return Vehicle(**v)

@router.get("/location/{location_id}", response_model=list[Vehicle])
async def api_get_vehicles_at_location(location_id: int):
    
        rows = await get_vehicles_at_location(location_id)
        return [Vehicle(**dict(r)) for r in rows]

@router.get("/available/filters", response_model=VehicleFilters)
async def api_get_vehicle_filters():
    rows = await database.fetch_all("SELECT DISTINCT body_style FROM vehicles")
    body_styles = [row["body_style"] for row in rows]
    rows = await database.fetch_all("SELECT DISTINCT location_id FROM locations")
    location_id = [row["location_id"] for row in rows]
    rows = await database.fetch_all("SELECT DISTINCT fuel_type FROM vehicles")
    fuel_types = [row["fuel_type"] for row in rows]
    return VehicleFilters(body_style=body_styles, location_id=location_id,fuel_type=fuel_types)

@router.get("/available/filter", response_model=list[Vehicle])
async def api_get_vehicles_filtered(location_id: list[int] = Query([]),
                                    start_date: str = Query("9999-12-31"), 
                                    end_date: str = Query("0000-01-01"), 
                                    body_style: list[str] = Query([]), 
                                    price_max: int = Query(2**31 - 1), 
                                    fuel_type: list[str] = Query([])):
        
        # Fill filters if not provided
        if not location_id:
            rows = await database.fetch_all("SELECT location_id FROM locations")
            location_id = [row["location_id"] for row in rows]
        if not body_style:
            rows = await database.fetch_all("SELECT DISTINCT body_style FROM vehicles")
            body_style = [row["body_style"] for row in rows]
        if not fuel_type:
            rows = await database.fetch_all("SELECT DISTINCT fuel_type FROM vehicles")
            fuel_type = [row["fuel_type"] for row in rows]

        rows = await get_vehicles_filtered(location_id, start_date, end_date, body_style, price_max, fuel_type)
        return [Vehicle(**dict(r)) for r in rows]

@router.post("/", response_model=Vehicle)
async def api_create_vehicle(vehicle: Vehicle):
    
        try:
            await create_vehicle(
                vehicle.VIN,
                vehicle.license_plate,
                vehicle.year,
                vehicle.make,
                vehicle.model,
                vehicle.body_style,
                vehicle.color,
                vehicle.miles,
                vehicle.rental_price,
                vehicle.location_id,
                vehicle.fuel_type,
                vehicle.rental_status,
                vehicle.photo_url,
            )
            return vehicle
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))


@router.put("/", response_model=Vehicle)
async def api_update_vehicle(vehicle: Vehicle):
    
        try:
            await update_vehicle(
                vehicle.VIN,
                vehicle.license_plate,
                vehicle.year,
                vehicle.make,
                vehicle.model,
                vehicle.body_style,
                vehicle.color,
                vehicle.miles,
                vehicle.rental_price,
                vehicle.location_id,
                vehicle.fuel_type,
                vehicle.rental_status,
                vehicle.photo_url,
            )
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))
        finally:
            return vehicle


@router.delete("/{vin}")
async def api_delete_vehicle(vin: str):
    
        deleted = await delete_vehicle(vin)
        if deleted == 0:
            raise HTTPException(404, "Vehicle not found")
        return {"detail": "Vehicle deleted"}

