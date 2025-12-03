import uvicorn
from fastapi import FastAPI
from contextlib import asynccontextmanager

from starlette.middleware.cors import CORSMiddleware

from database import database, DATABASE_URL

from starlette_admin.contrib.sqla import Admin

from sqlalchemy.ext.asyncio import create_async_engine

# StarRental Routers
from routes.locations_routes import router as locations_router
from routes.payment_info_routes import router as payment_info_router
from routes.rental_info_routes import router as rental_info_router
from routes.repairs_routes import router as repairs_router
from routes.users_routes import router as users_router
from routes.vehicles_routes import router as vehicles_router

# StarRental Views
# from views.locations_view import locations
# from views.payment_info_view import PaymentInfoView
# from views.rental_info_view import RentalInfoView
# from views.repairs_view import RepairsView
# from views.users_view import UsersView
# from views.vehicles_view import VehiclesView

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    print("Database connection established")
    yield
    await database.disconnect()
    print("Database disconnection established")

app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# StarRental Routers
app.include_router(locations_router)
app.include_router(payment_info_router)
app.include_router(rental_info_router)
app.include_router(repairs_router)
app.include_router(users_router)
app.include_router(vehicles_router)

# Create SQLAlchemy engine for admin
engine = create_async_engine(DATABASE_URL)

# Create admin instance without SQLAlchemy engine (for custom raw SQL views)
admin = Admin(
    engine=engine,
    title="Database Admin Panel",
    base_url="/admin"
)

# StarRental Views
"""
admin.add_view(LocationsView)
admin.add_view(PaymentInfoView)
admin.add_view(RentalInfoView)
admin.add_view(RepairsView)
admin.add_view(UsersView)
admin.add_view(VehiclesView)
"""
admin.mount_to(app)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Database Course Project 2",
        "api_docs": "/docs"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8007, reload=True)