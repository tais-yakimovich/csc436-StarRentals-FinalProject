from fastapi import APIRouter, HTTPException
from database import database
from schemas.vehicles import Vehicle
from crud.vehicles_crud import (
    get_vehicles,
    get_vehicle,
    create_vehicle,
    update_vehicle,
    delete_vehicle,
    get_vehicles_at_location
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
        except ValueError as err:
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
        except ValueError as err:
            raise HTTPException(status_code=400, detail=str(err))
        finally:
            return vehicle


@router.delete("/{vin}")
async def api_delete_vehicle(vin: str):
    
        deleted = await delete_vehicle(vin)
        if deleted == 0:
            raise HTTPException(404, "Vehicle not found")
        return {"detail": "Vehicle deleted"}

