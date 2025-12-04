from fastapi import APIRouter, HTTPException
from database import database
from schemas.users import User, UserID
from crud.users_crud import (
    get_users,
    user_login,
    get_user,
    create_user,
    update_user,
    delete_user,
)

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/", response_model=list[User])
async def api_get_users(skip: int = 0, limit: int = 10):
    
        rows = await get_users(skip, limit)
        return [User(**dict(r)) for r in rows]

@router.get("/log_in", response_model=UserID)
async def api_login(user_username, user_password):
    
        u = await user_login(user_username, user_password)
        if not u:
            raise HTTPException(404, "User not found")
        return UserID(**u)

@router.get("/{user_id}", response_model=User)
async def api_get_user(user_id: int):
    
        u = await get_user(user_id)
        if not u:
            raise HTTPException(404, "User not found")
        return User(**u)


@router.post("/", response_model=User)
async def api_create_user(user: User):
    
        try:
            user_id = await create_user(
                user.username,
                user.password_hash,
                user.phone_number,
                user.first_name,
                user.last_name,
                user.date_of_birth,
                user.driver_license_number,
                user.driver_license_state,
                user.address_line1,
                user.address_line2,
                user.city,
                user.state,
                user.zip_code,
                user.country,
            )
            user.user_id = user_id
            return user
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))


@router.put("/", response_model=User)
async def api_update_user(user: User):
    
        try:
            await update_user(
                user.user_id,
                user.username,
                user.password_hash,
                user.phone_number,
                user.first_name,
                user.last_name,
                user.date_of_birth,
                user.driver_license_number,
                user.driver_license_state,
                user.address_line1,
                user.address_line2,
                user.city,
                user.state,
                user.zip_code,
                user.country,
            )
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))
        finally:
            return user


@router.delete("/{user_id}")
async def api_delete_user(user_id: int):
    
        deleted = await delete_user(user_id)
        if deleted == 0:
            raise HTTPException(404, "User not found")
        return {"detail": "User deleted"}