from fastapi import APIRouter, HTTPException
from database import database
from schemas.locations import Location
from crud.locations_crud import (
    get_locations,
    get_location,
    create_location,
    delete_location,
)
from crud.locations_crud import update_location

router = APIRouter(prefix="/api/locations", tags=["Locations"])


@router.get("/", response_model=list[Location])
async def api_get_locations(skip: int = 0, limit: int = 10):
    
        rows = await get_locations(skip, limit)
        return [Location(**dict(r)) for r in rows]


@router.get("/{location_id}", response_model=Location)
async def api_get_location(location_id: int):
    
        l = await get_location(location_id)
        if not l:
            raise HTTPException(404, "Location not found")
        return Location(**l)


@router.post("/", response_model=Location)
async def api_create_location(location: Location):
    
        try:
            location_id = await create_location(
                location.Lname if hasattr(location, 'Lname') else location.Lname,
                location.address_line1,
                getattr(location, 'address_line2', None),
                location.city,
                location.state,
                int(location.zip_code),
                location.country,
                getattr(location, 'phone_number', None),
                getattr(location, 'email', None),
            )
            location.location_id = location_id
            return location
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))


@router.delete("/{location_id}")
async def api_delete_location(location_id: int):
    
        deleted = await delete_location(location_id)
        if deleted == 0:
            raise HTTPException(404, "Location not found")
        return {"detail": "Location deleted"}

from crud.locations_crud import update_location

@router.put("/", response_model=Location)
async def api_update_location(location: Location):
    
        try:
            await update_location(
                location.location_id,
                location.Lname,
                location.address_line1,
                getattr(location, 'address_line2', None),
                location.city,
                location.state,
                int(location.zip_code),
                location.country,
                getattr(location, 'phone_number', None),
                getattr(location, 'email', None),
            )
            return location
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))
