from database import database


# READ all with pagination
async def get_rental_info(skip: int = 0, limit: int = 10):
    query = """
        SELECT rental_id, start_mileage, return_mileage, start_date, return_date,
               VIN, user_id, pickup_location_id, dropoff_location_id, payment_id
        FROM rental_info
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={'limit': limit, 'skip': skip})


# READ one by repair_id
async def get_rental_info_by_id(rental_id: int):
    query = """
        SELECT rental_id, start_mileage, return_mileage, start_date, return_date,
               VIN, user_id, pickup_location_id, dropoff_location_id, payment_id
        FROM rental_info
        WHERE rental_id = :rental_id
    """
    row = await database.fetch_one(query=query, values={"rental_id": rental_id})
    return dict(row) if row else None

async def get_rental_ids_for_user(user_id: int):
    query = """
        SELECT rental_id, start_mileage, return_mileage, start_date, return_date,
               VIN, user_id, pickup_location_id, dropoff_location_id, payment_id
        FROM rental_info
        WHERE user_id = :user_id
    """
    rows = await database.fetch_all(query=query, values={"user_id": user_id})
    return [dict(row) for row in rows]

# CREATE new course
async def create_rental_info(
    start_mileage: int,
    return_mileage: int,
    start_date,
    return_date,
    VIN: str,
    user_id: int,
    pickup_location_id: int,
    dropoff_location_id: int,
    payment_id: int
) -> int:
    query = """
        INSERT INTO rental_info (
            start_mileage, return_mileage, start_date, return_date,
            VIN, user_id, pickup_location_id, dropoff_location_id, payment_id
        ) VALUES (
            :start_mileage, :return_mileage, :start_date, :return_date,
            :VIN, :user_id, :pickup_location_id, :dropoff_location_id, :payment_id
        )
    """
    try:
        rental_id = await database.execute(query=query, values={
            "start_mileage": start_mileage,
            "return_mileage": return_mileage,
            "start_date": start_date,
            "return_date": return_date,
            "VIN": VIN,
            "user_id": user_id,
            "pickup_location_id": pickup_location_id,
            "dropoff_location_id": dropoff_location_id,
            "payment_id": payment_id
        })
        return rental_id
    except Exception:
        raise ValueError(f"Rental with id {rental_id} already exists or invalid foreign key.")


# UPDATE reatal info
async def update_rental_info(
    rental_id: int,
    start_mileage: int,
    return_mileage: int,
    start_date,
    return_date,
    VIN: str,
    user_id: int,
    pickup_location_id: int,
    dropoff_location_id: int,
    payment_id: int
) -> bool:
    query = """
        UPDATE rental_info
        SET start_mileage = :start_mileage,
            return_mileage = :return_mileage,
            start_date = :start_date,
            return_date = :return_date,
            VIN = :VIN,
            user_id = :user_id,
            pickup_location_id = :pickup_location_id,
            dropoff_location_id = :dropoff_location_id,
            payment_id = :payment_id
        WHERE rental_id = :rental_id
    """
    try:
        await database.execute(query=query, values={
            "rental_id": rental_id,
            "start_mileage": start_mileage,
            "return_mileage": return_mileage,
            "start_date": start_date,
            "return_date": return_date,
            "VIN": VIN,
            "user_id": user_id,
            "pickup_location_id": pickup_location_id,
            "dropoff_location_id": dropoff_location_id,
            "payment_id": payment_id
        })
        return True
    except Exception as err:
        raise ValueError(f"Error updating rental_info {rental_id}: {err}")


# DELETE one
async def delete_rental_info(rental_id: int) -> int:
    query = "DELETE FROM rental_info WHERE rental_id = :rental_id"
    return await database.execute(query=query, values={"rental_id": rental_id})
