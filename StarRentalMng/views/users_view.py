import logging
from typing import Any, List, Optional

from starlette.requests import Request
from starlette_admin import BaseModelView
from starlette_admin.exceptions import FormValidationError
from starlette_admin.fields import IntegerField, StringField
from database import database

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class UserView(BaseModelView):
    # ==============================================================
    # BASIC CONFIGURATION
    # ==============================================================
    identity = "users"
    name = "User"
    label = "Users"
    icon = "fa fa-user"
    pk_attr = "user_id"

    form_include_pk = True

    searchable_fields = ["username", "first_name", "last_name"]
    sortable_fields = ["user_id", "username", "first_name", "last_name", "created_at"]

    # ==============================================================
    # FIELD DEFINITIONS
    # ==============================================================
    fields = [
        IntegerField(
            name="user_id",
            label="User ID",
            required=True,
        ),
        StringField(name="username", label="Username", required=True),
        StringField(name="password_hash", label="Password Hash", required=True),
        StringField(name="phone_number", label="Phone Number", required=True),
        StringField(name="first_name", label="First Name", required=True),
        StringField(name="last_name", label="Last Name", required=True),
        StringField(name="date_of_birth", label="Date of Birth", required=True),
        IntegerField(name="driver_license_number", label="Driver License #", required=True),
        StringField(name="driver_license_state", label="DL State", required=True),
        StringField(name="address_line1", label="Address Line 1", required=True),
        StringField(name="address_line2", label="Address Line 2", required=False),
        StringField(name="city", label="City", required=True),
        StringField(name="state", label="State", required=True),
        IntegerField(name="zip_code", label="Zip Code", required=True),
        StringField(name="country", label="Country", required=True),
        StringField(name="created_at", label="Created At", required=False),
    ]

    # ==============================================================
    # EXTRACT PRIMARY KEY VALUE
    # ==============================================================
    async def get_pk_value(self, request: Request, obj: Any) -> Any:
        return obj["user_id"] if isinstance(obj, dict) else getattr(obj, self.pk_attr)

    # ==============================================================
    # SERIALIZE ROW TO DICT
    # ==============================================================
    async def serialize(self, *args, **kwargs) -> dict:
        obj = args[0] if args else kwargs.get("obj") or kwargs.get("instance")

        if obj is None:
            return {}

        if not isinstance(obj, dict):
            obj = dict(obj._mapping) if hasattr(obj, "_mapping") else obj.__dict__

        return {
            "user_id": obj.get("user_id"),
            "username": obj.get("username"),
            "password_hash": obj.get("password_hash"),
            "phone_number": obj.get("phone_number"),
            "first_name": obj.get("first_name"),
            "last_name": obj.get("last_name"),
            "date_of_birth": obj.get("date_of_birth"),
            "driver_license_number": obj.get("driver_license_number"),
            "driver_license_state": obj.get("driver_license_state"),
            "address_line1": obj.get("address_line1"),
            "address_line2": obj.get("address_line2"),
            "city": obj.get("city"),
            "state": obj.get("state"),
            "zip_code": obj.get("zip_code"),
            "country": obj.get("country"),
            "created_at": obj.get("created_at"),
            "_meta": {"pk": obj.get("user_id")},
        }

    # ==============================================================
    # VALIDATE FORM INPUT
    # ==============================================================
    async def validate(self, request: Request, data: dict) -> None:
        errors = {}

        required_fields = [
            "user_id",
            "username",
            "password_hash",
            "phone_number",
            "first_name",
            "last_name",
            "date_of_birth",
            "driver_license_number",
            "driver_license_state",
            "address_line1",
            "city",
            "state",
            "zip_code",
            "country",
        ]

        for field in required_fields:
            if not data.get(field):
                errors[field] = "Required"

        if errors:
            raise FormValidationError(errors)

    # ==============================================================
    # LIST VIEW WITH SEARCH
    # ==============================================================
    async def find_all(
        self,
        request: Request,
        skip: int = 0,
        limit: int = 100,
        where: Optional[Any] = None,
        order_by: Optional[List[Any]] = None,
    ) -> List[Any]:
        
            if where and isinstance(where, (str, int)) and str(where).strip():
                search_term = str(where).strip()
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
                    WHERE username LIKE :search 
                       OR first_name LIKE :search
                       OR last_name LIKE :search
                    LIMIT :limit OFFSET :skip
                """
                rows = await database.fetch_all(
                    query=query,
                    values={"search": f"%{search_term}%", "limit": limit, "skip": skip},
                )
            else:
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
                rows = await database.fetch_all(
                    query=query,
                    values={"limit": limit, "skip": skip},
                )

            return [dict(row) for row in rows]

    # ==============================================================
    # COUNT TOTAL RECORDS
    # ==============================================================
    async def count(self, request: Request, where: Optional[Any] = None) -> int:
        
            if where and isinstance(where, (str, int)) and str(where).strip():
                search_term = str(where).strip()
                query = """
                    SELECT COUNT(*) 
                    FROM users
                    WHERE username LIKE :search
                       OR first_name LIKE :search
                       OR last_name LIKE :search
                """
                return await database.fetch_val(query, values={"search": f"%{search_term}%"})
            else:
                return await database.fetch_val("SELECT COUNT(*) FROM users")

    # ==============================================================
    # FIND BY PRIMARY KEY
    # ==============================================================
    async def find_by_pk(self, request: Request, pk: Any) -> Optional[Any]:
        
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
            row = await database.fetch_one(query, values={"user_id": pk})
            return dict(row) if row else None

    # ==============================================================
    # CREATE NEW USER
    # ==============================================================
    async def create(self, request: Request, data: dict) -> Any:
        await self.validate(request, data)
        
            query = """
                INSERT INTO users (
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
                )
                VALUES (
                    :user_id,
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
            await database.execute(query, values=data)
            # Return newly created record
            return await self.find_by_pk(request, data["user_id"])

    # ==============================================================
    # UPDATE EXISTING USER
    # ==============================================================
    async def edit(self, request: Request, pk: Any, data: dict) -> Any:
        await self.validate(request, data)
        
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
            values = data.copy()
            values["user_id"] = pk
            await database.execute(query, values=values)

            return await self.find_by_pk(request, pk)

    # ==============================================================
    # DELETE ONE OR MANY
    # ==============================================================
    async def delete(self, request: Request, pks: List[Any]) -> int:
        if not pks:
            return 0
        
            placeholders = ",".join(f":id{i}" for i in range(len(pks)))
            query = f"DELETE FROM users WHERE user_id IN ({placeholders})"
            values = {f"id{i}": pk for i, pk in enumerate(pks)}
            return await database.execute(query, values=values)
