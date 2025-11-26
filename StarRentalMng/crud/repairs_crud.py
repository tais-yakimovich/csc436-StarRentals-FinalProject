from database import database


# READ all with pagination
async def get_repairs(skip: int = 0, limit: int = 10):
    query = """
        SELECT repair_id, repair_description, VIN, location_id
        FROM repairs
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={'limit': limit, 'skip': skip})


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
async def create_repair(repair_id: int, repair_description: str, VIN: int, location_id: int) -> int:
    query = """
        INSERT INTO repair (repair_id, repair_description, VIN, location_id)
        VALUES (:repair_id, :repair_description, :VIN, :location_id)
    """
    try:
        await database.execute(query=query, values={
            "repair_id": repair_id,
            "repair_description": repair_description,
            "VIN": VIN,
            "location_id": location_id
        })
        return repair_id
    except Exception:
        raise ValueError(f"Reapir with code {repair_id} already exists or invalid location.")


# UPDATE repair
async def update_repair(repair_id: int, course_title: str, department_code: int) -> bool:
    query = """
        UPDATE Course 
        SET course_title = :course_title, department_code = :department_code
        WHERE repair_id = :repair_id
    """
    try:
        await database.execute(query=query, values={
            "repair_id": repair_id,
            "course_title": course_title,
            "department_code": department_code
        })
        return True
    except Exception as err:
        raise ValueError(f"Error updating course {repair_id}: {err}")


# DELETE one
async def delete_course(repair_id: int) -> int:
    query = "DELETE FROM Course WHERE repair_id = :repair_id"
    return await database.execute(query=query, values={"repair_id": repair_id})


# DELETE many
async def delete_courses(repair_ids: list[int]) -> int:
    if not repair_ids:
        return 0
    placeholders = ",".join(f":id{i}" for i in range(len(repair_ids)))
    query = f"DELETE FROM Course WHERE repair_id IN ({placeholders})"
    values = {f"id{i}": code for i, code in enumerate(repair_ids)}
    return await database.execute(query=query, values=values)


# Helper: Get all departments for dropdown (NEW - for FK support)
async def get_all_departments():
    """
    Fetch all departments to populate dropdown in admin UI.
    Returns list of tuples: [(dept_code, dept_name), ...]
    """
    query = "SELECT department_code, department_name FROM Department ORDER BY department_name"
    rows = await database.fetch_all(query=query)
    return [(row["department_code"], row["department_name"]) for row in rows]
