from fastapi import APIRouter, HTTPException
from database import database
from schemas.rental_info import RentalInfo
from crud.rental_info_crud import (get_rental_info, get_rental_info_by_id, create_rental_info, update_rental_info, delete_rental_info)

router = APIRouter(prefix="/api/rental_info", tags=["Rental Info"])


@router.get("/", response_model=list[RentalInfo])
async def api_get_rental_info(skip: int = 0, limit: int = 10):
    async with database:
        rows = await get_rental_info(skip, limit)
        return [RentalInfo(**dict(r)) for r in rows]


@router.get("/{rental_id}", response_model=RentalInfo)
async def api_get_rental_info_by_id(rental_id: int):
    async with database:
        c = await get_rental_info_by_id(rental_id)
        if not c:
            raise HTTPException(404, "RentalInfo not found")
        return RentalInfo(**c)


@router.post("/", response_model=RentalInfo)
async def api_create_rental_info(rental_info: RentalInfo):
    async with database:
        try:
            code = await create_rental_info(
                rental_info.rental_id,
                rental_info.start_mileage,
                rental_info.return_mileage,
                rental_info.start_date,
                rental_info.return_date,
                rental_info.VIN,
                rental_info.user_id,
                rental_info.pickup_location_id,
                rental_info.dropoff_location_id,
                rental_info.payment_id)
            return RentalInfo(**rental_info.dict())
        except ValueError as err:
            raise HTTPException(status_code=400, detail=str(err))


@router.put("/", response_model=RentalInfo)
async def api_update_rental_info(rental_info: RentalInfo):
    async with database:
        try:
            await update_rental_info(
                rental_info.rental_id,
                rental_info.start_mileage,
                rental_info.return_mileage,
                rental_info.start_date,
                rental_info.return_date,
                rental_info.VIN,
                rental_info.user_id,
                rental_info.pickup_location_id,
                rental_info.dropoff_location_id,
                rental_info.payment_id)
        except ValueError as err:
            raise HTTPException(status_code=400, detail=str(err))
        finally:
            return RentalInfo(**rental_info.dict())


@router.delete("/{rental_id}")
async def api_delete_repair(rental_id: int):
    async with database:
        deleted = await delete_rental_info(rental_id)
        if deleted == 0:
            raise HTTPException(404, "RentalInfo not found")
        return {"detail": "RentalInfo deleted"}
