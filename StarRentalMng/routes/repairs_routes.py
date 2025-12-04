from fastapi import APIRouter, HTTPException
from database import database
from schemas.repairs import Repairs, RepairID
from crud.repairs_crud import (get_repairs, get_repair, create_repair, update_repair, delete_repair, get_repair_ids_for_VIN)

router = APIRouter(prefix="/api/repairs", tags=["Repairs"])


@router.get("/", response_model=list[Repairs])
async def api_get_repairs(skip: int = 0, limit: int = 10):
    
        rows = await get_repairs(skip, limit)
        return [Repairs(**dict(r)) for r in rows]


@router.get("/{repair_id}", response_model=Repairs)
async def api_get_repair(repair_id: int):
    
        c = await get_repair(repair_id)
        if not c:
            raise HTTPException(404, "Repairs not found")
        return Repairs(**c)

@router.get("/vin/{VIN}", response_model=list[RepairID])
async def api_get_repairs_by_VIN(VIN: str):
    
        rows = await get_repair_ids_for_VIN(VIN)
        return [RepairID(**dict(r)) for r in rows]

@router.post("/", response_model=Repairs)
async def api_create_repair(repair: Repairs):
    
        try:
            repair_id = await create_repair(repair.repair_description, repair.VIN, repair.location_id)
            repair.repair_id = repair_id
            return Repairs(**repair.dict())
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))


@router.put("/", response_model=Repairs)
async def api_update_repair(repair: Repairs):
    
        try:
            await update_repair(repair.repair_id, repair.repair_description, repair.VIN, repair.location_id)
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))
        finally:
            return Repairs(**repair.dict())


@router.delete("/{course_code}")
async def api_delete_repair(repair_id: int):
    
        deleted = await delete_repair(repair_id)
        if deleted == 0:
            raise HTTPException(404, "Repairs not found")
        return {"detail": "Repairs deleted"}
