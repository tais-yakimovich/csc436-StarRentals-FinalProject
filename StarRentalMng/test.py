import asyncio
import httpx

BASE_URL = "http://127.0.0.1:8007"

async def test_get_locations():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/locations")
        print("GET /locations:", response.status_code, response.json())
        
async def test_get_locations():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/locations")
        print("GET /locations:", response.status_code, response.json())

async def test_get_users():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/users")
        print("GET /users:", response.status_code, response.json())

# Add more test functions as needed...

async def main():
    await test_get_locations()
    await test_get_users()

if __name__ == "__main__":
    asyncio.run(main())