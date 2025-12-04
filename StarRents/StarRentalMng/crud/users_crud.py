from database import database
from typing import List, Optional


# READ all users
async def get_users(skip: int = 0, limit: int = 10):
    query = """
        SELECT 
            user_id,
            username,
            password_hash,
            phone_number,
            first_name,
            last_name,
            date_of_birth,
            driver_license_number,
            driver_license_state,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            country,
            created_at
        FROM users
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={"limit": limit, "skip": skip})

async def user_login(user_email: str, user_password: str) -> Optional[dict]:
    query = """
        SELECT 
            user_id
        FROM users
        WHERE username = :user_email AND password_hash = :user_password
    """
    row = await database.fetch_one(query=query, values={"user_email": user_email, "user_password": user_password})
    return dict(row) if row else None


# READ one user by user_id
async def get_user(user_id: int):
    query = """
        SELECT 
            user_id,
            username,
            password_hash,
            phone_number,
            first_name,
            last_name,
            date_of_birth,
            driver_license_number,
            driver_license_state,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            country,
            created_at
        FROM users
        WHERE user_id = :user_id
    """
    row = await database.fetch_one(query=query, values={"user_id": user_id})
    return dict(row) if row else None


# CREATE new user
async def create_user(
    username: str,
    password_hash: str,
    phone_number: str,
    first_name: str,
    last_name: str,
    date_of_birth: str,
    driver_license_number: int,
    driver_license_state: str,
    address_line1: str,
    address_line2: str | None,
    city: str,
    state: str,
    zip_code: int,
    country: str,
) -> int:
    query = """
        INSERT INTO users (
            username,
            password_hash,
            phone_number,
            first_name,
            last_name,
            date_of_birth,
            driver_license_number,
            driver_license_state,
            address_line1,
            address_line2,
            city,
            state,
            zip_code,
            country,
            created_at
        )
        VALUES (
            :username,
            :password_hash,
            :phone_number,
            :first_name,
            :last_name,
            :date_of_birth,
            :driver_license_number,
            :driver_license_state,
            :address_line1,
            :address_line2,
            :city,
            :state,
            :zip_code,
            :country,
            NOW()
        )
    """
    try:
        user_id = await database.execute(
            query=query,
            values={
                "username": username,
                "password_hash": password_hash,
                "phone_number": phone_number,
                "first_name": first_name,
                "last_name": last_name,
                "date_of_birth": date_of_birth,
                "driver_license_number": driver_license_number,
                "driver_license_state": driver_license_state,
                "address_line1": address_line1,
                "address_line2": address_line2,
                "city": city,
                "state": state,
                "zip_code": zip_code,
                "country": country,
            },
        )
        return user_id
    except Exception as err:
        # Could be duplicate user_id or username, or FK issues if you add FKs later
        raise ValueError(f"Failed ({err})")


# UPDATE existing user
async def update_user(
    user_id: int,
    username: str,
    password_hash: str,
    phone_number: str,
    first_name: str,
    last_name: str,
    date_of_birth: str,
    driver_license_number: int,
    driver_license_state: str,
    address_line1: str,
    address_line2: str | None,
    city: str,
    state: str,
    zip_code: int,
    country: str,
) -> bool:
    query = """
        UPDATE users
        SET
            username             = :username,
            password_hash        = :password_hash,
            phone_number         = :phone_number,
            first_name           = :first_name,
            last_name            = :last_name,
            date_of_birth        = :date_of_birth,
            driver_license_number = :driver_license_number,
            driver_license_state = :driver_license_state,
            address_line1        = :address_line1,
            address_line2        = :address_line2,
            city                 = :city,
            state                = :state,
            zip_code             = :zip_code,
            country              = :country
        WHERE user_id = :user_id
    """
    try:
        await database.execute(
            query=query,
            values={
                "user_id": user_id,
                "username": username,
                "password_hash": password_hash,
                "phone_number": phone_number,
                "first_name": first_name,
                "last_name": last_name,
                "date_of_birth": date_of_birth,
                "driver_license_number": driver_license_number,
                "driver_license_state": driver_license_state,
                "address_line1": address_line1,
                "address_line2": address_line2,
                "city": city,
                "state": state,
                "zip_code": zip_code,
                "country": country,
            },
        )
        return True
    except Exception as err:
        raise ValueError(f"Error updating user {user_id}: {err}")


# DELETE one user
async def delete_user(user_id: int) -> int:
    query = "DELETE FROM users WHERE user_id = :user_id"
    return await database.execute(query=query, values={"user_id": user_id})


# DELETE many users
async def delete_users(user_ids: list[int]) -> int:
    if not user_ids:
        return 0
    placeholders = ",".join(f":id{i}" for i in range(len(user_ids)))
    query = f"DELETE FROM users WHERE user_id IN ({placeholders})"
    values = {f"id{i}": uid for i, uid in enumerate(user_ids)}
    return await database.execute(query=query, values=values)