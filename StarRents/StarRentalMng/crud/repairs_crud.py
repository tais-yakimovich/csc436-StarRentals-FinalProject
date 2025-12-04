from database import database


# READ all with pagination
async def get_repairs(skip: int = 0, limit: int = 10):
    query = """
        SELECT repair_id, repair_description, VIN, location_id
        FROM repairs
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={'limit': limit, 'skip': skip})

async def get_repair_ids_for_VIN(VIN: str):
    query = """
        SELECT repair_id
        FROM repairs
        WHERE VIN = :VIN
    """
    rows = await database.fetch_all(query=query, values={"VIN": VIN})
    return [dict(row) for row in rows]

# READ one by repair_id
async def get_repair(repair_id: int):
    query = """
        SELECT repair_id, repair_description, VIN, location_id
        FROM repairs 
        WHERE repair_id = :repair_id
    """
    row = await database.fetch_one(query=query, values={"repair_id": repair_id})
    return dict(row) if row else None

# CREATE new course
async def create_repair(repair_description: str, VIN: int, location_id: int) -> int:
    query = """
        INSERT INTO repairs (repair_description, VIN, location_id)
        VALUES (:repair_description, :VIN, :location_id)
    """
    try:
        repair_id = await database.execute(query=query, values={
            "repair_description": repair_description,
            "VIN": VIN,
            "location_id": location_id
        })
        return repair_id
    except Exception:
        raise ValueError(f"Repair with code {repair_id} already exists or invalid location.")


# UPDATE repair
async def update_repair(repair_id: int, repair_description: str, VIN: int, location_id: int) -> bool:
    query = """
        UPDATE repairs
        SET repair_description = :repair_description, VIN = :VIN, location_id = :location_id
        WHERE repair_id = :repair_id
    """
    try:
        await database.execute(query=query, values={
            "repair_id": repair_id,
            "repair_description": repair_description,
            "VIN": VIN,
            "location_id": location_id
        })
        return True
    except Exception as err:
        raise ValueError(f"Error updating repair {repair_id}: {err}")


# DELETE one
async def delete_repair(repair_id: int) -> int:
    query = "DELETE FROM repairs WHERE repair_id = :repair_id"
    return await database.execute(query=query, values={"repair_id": repair_id})
