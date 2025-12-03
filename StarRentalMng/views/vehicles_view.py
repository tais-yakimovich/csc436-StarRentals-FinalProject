import logging
from typing import Any, List, Optional

from starlette.requests import Request
from starlette_admin import BaseModelView
from starlette_admin.exceptions import FormValidationError
from starlette_admin.fields import IntegerField, StringField
from database import database

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


class VehicleView(BaseModelView):
    # ==============================================================
    # BASIC CONFIGURATION
    # ==============================================================
    identity = "vehicles"
    name = "Vehicle"
    label = "Vehicles"
    icon = "fa fa-car"
    pk_attr = "VIN"

    form_include_pk = True

    searchable_fields = ["VIN", "license_plate", "make", "model"]
    sortable_fields = ["VIN", "license_plate", "year", "make", "model", "location_id"]

    # ==============================================================
    # FIELD DEFINITIONS
    # ==============================================================
    fields = [
        StringField(name="VIN", label="VIN", required=True),
        StringField(name="license_plate", label="License Plate", required=True),
        IntegerField(name="year", label="Year", required=True),
        StringField(name="make", label="Make", required=True),
        StringField(name="model", label="Model", required=True),
        StringField(name="body_style", label="Body Style", required=True),
        StringField(name="color", label="Color", required=True),
        IntegerField(name="miles", label="Miles", required=True),
        StringField(name="rental_price", label="Rental Price", required=True),
        IntegerField(name="location_id", label="Location ID", required=True),
        StringField(name="fuel_type", label="Fuel Type", required=True),
        StringField(name="rental_status", label="Rental Status", required=True),
        StringField(name="photo_url", label="Photo URL", required=True),
    ]

    # ==============================================================
    # EXTRACT PRIMARY KEY VALUE
    # ==============================================================
    async def get_pk_value(self, request: Request, obj: Any) -> Any:
        return obj["VIN"] if isinstance(obj, dict) else getattr(obj, self.pk_attr)

    # ==============================================================
    # SERIALIZE WITH LOCATION NAME
    # ==============================================================
    async def serialize(self, *args, **kwargs) -> dict:
        obj = args[0] if args else kwargs.get("obj") or kwargs.get("instance")

        if obj is None:
            return {}

        if not isinstance(obj, dict):
            obj = dict(obj._mapping) if hasattr(obj, "_mapping") else obj.__dict__

        # Fetch location name for display (similar to department_name in CourseView)
        location_name = obj.get("location_name")
        if not location_name and obj.get("location_id") is not None:
            
                loc_query = "SELECT Lname FROM locations WHERE location_id = :id"
                loc = await database.fetch_one(loc_query, values={"id": obj.get("location_id")})
                location_name = loc["Lname"] if loc else "Unknown"

        return {
            "VIN": obj.get("VIN"),
            "license_plate": obj.get("license_plate"),
            "year": obj.get("year"),
            "make": obj.get("make"),
            "model": obj.get("model"),
            "body_style": obj.get("body_style"),
            "color": obj.get("color"),
            "miles": obj.get("miles"),
            "rental_price": obj.get("rental_price"),
            "location_id": obj.get("location_id"),
            "location_name": location_name,
            "fuel_type": obj.get("fuel_type"),
            "rental_status": obj.get("rental_status"),
            "photo_url": obj.get("photo_url"),
            "_meta": {"pk": obj.get("VIN")},
        }

    # ==============================================================
    # VALIDATE FORM INPUT & FOREIGN KEY
    # ==============================================================
    async def validate(self, request: Request, data: dict) -> None:
        errors = {}

        required_fields = [
            "VIN",
            "license_plate",
            "year",
            "make",
            "model",
            "body_style",
            "color",
            "miles",
            "rental_price",
            "location_id",
            "fuel_type",
            "rental_status",
            "photo_url",
        ]

        for field in required_fields:
            if data.get(field) is None or data.get(field) == "":
                errors[field] = "Required"

        # Validate foreign key: location_id must exist in locations
        if data.get("location_id") is not None:
            
                loc_exists = await database.fetch_val(
                    "SELECT COUNT(*) FROM locations WHERE location_id = :id",
                    values={"id": data.get("location_id")},
                )
                if loc_exists == 0:
                    errors["location_id"] = f"Location ID {data.get('location_id')} does not exist"

        if errors:
            raise FormValidationError(errors)

    # ==============================================================
    # LIST VIEW WITH SEARCH (JOIN LOCATIONS FOR NAME)
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
                        v.VIN,
                        v.license_plate,
                        v.year,
                        v.make,
                        v.model,
                        v.body_style,
                        v.color,
                        v.miles,
                        v.rental_price,
                        v.location_id,
                        l.Lname AS location_name,
                        v.fuel_type,
                        v.rental_status,
                        v.photo_url
                    FROM vehicles v
                    LEFT JOIN locations l ON v.location_id = l.location_id
                    WHERE v.VIN LIKE :search
                       OR v.license_plate LIKE :search
                       OR v.make LIKE :search
                       OR v.model LIKE :search
                    LIMIT :limit OFFSET :skip
                """
                rows = await database.fetch_all(
                    query=query,
                    values={"search": f"%{search_term}%", "limit": limit, "skip": skip},
                )
            else:
                query = """
                    SELECT 
                        v.VIN,
                        v.license_plate,
                        v.year,
                        v.make,
                        v.model,
                        v.body_style,
                        v.color,
                        v.miles,
                        v.rental_price,
                        v.location_id,
                        l.Lname AS location_name,
                        v.fuel_type,
                        v.rental_status,
                        v.photo_url
                    FROM vehicles v
                    LEFT JOIN locations l ON v.location_id = l.location_id
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
                    FROM vehicles
                    WHERE VIN LIKE :search
                       OR license_plate LIKE :search
                       OR make LIKE :search
                       OR model LIKE :search
                """
                return await database.fetch_val(query, values={"search": f"%{search_term}%"})
            else:
                return await database.fetch_val("SELECT COUNT(*) FROM vehicles")

    # ==============================================================
    # FIND BY PRIMARY KEY
    # ==============================================================
    async def find_by_pk(self, request: Request, pk: Any) -> Optional[Any]:
        
            query = """
                SELECT 
                    v.VIN,
                    v.license_plate,
                    v.year,
                    v.make,
                    v.model,
                    v.body_style,
                    v.color,
                    v.miles,
                    v.rental_price,
                    v.location_id,
                    l.Lname AS location_name,
                    v.fuel_type,
                    v.rental_status,
                    v.photo_url
                FROM vehicles v
                LEFT JOIN locations l ON v.location_id = l.location_id
                WHERE v.VIN = :vin
            """
            row = await database.fetch_one(query, values={"vin": pk})
            return dict(row) if row else None

    # ==============================================================
    # CREATE NEW VEHICLE
    # ==============================================================
    async def create(self, request: Request, data: dict) -> Any:
        await self.validate(request, data)
        
            query = """
                INSERT INTO vehicles (
                    VIN,
                    license_plate,
                    year,
                    make,
                    model,
                    body_style,
                    color,
                    miles,
                    rental_price,
                    location_id,
                    fuel_type,
                    rental_status,
                    photo_url
                )
                VALUES (
                    :VIN,
                    :license_plate,
                    :year,
                    :make,
                    :model,
                    :body_style,
                    :color,
                    :miles,
                    :rental_price,
                    :location_id,
                    :fuel_type,
                    :rental_status,
                    :photo_url
                )
            """
            await database.execute(query, values=data)
            return await self.find_by_pk(request, data["VIN"])

    # ==============================================================
    # UPDATE EXISTING VEHICLE
    # ==============================================================
    async def edit(self, request: Request, pk: Any, data: dict) -> Any:
        await self.validate(request, data)
        
            query = """
                UPDATE vehicles
                SET
                    license_plate = :license_plate,
                    year          = :year,
                    make          = :make,
                    model         = :model,
                    body_style    = :body_style,
                    color         = :color,
                    miles         = :miles,
                    rental_price  = :rental_price,
                    location_id   = :location_id,
                    fuel_type     = :fuel_type,
                    rental_status = :rental_status,
                    photo_url     = :photo_url
                WHERE VIN = :VIN
            """
            values = data.copy()
            values["VIN"] = pk
            await database.execute(query, values=values)

            return await self.find_by_pk(request, pk)

    # ==============================================================
    # DELETE ONE OR MANY
    # ==============================================================
    async def delete(self, request: Request, pks: List[Any]) -> int:
        if not pks:
            return 0
        
            placeholders = ",".join(f":id{i}" for i in range(len(pks)))
            query = f"DELETE FROM vehicles WHERE VIN IN ({placeholders})"
            values = {f"id{i}": pk for i, pk in enumerate(pks)}
            return await database.execute(query, values=values)
