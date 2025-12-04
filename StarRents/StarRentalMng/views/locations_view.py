from fastapi import Request
from fastapi.responses import HTMLResponse
from database import database
from crud.locations_crud import get_locations, get_location


async def locations_list(request: Request):
    
        rows = await get_locations(0, 50)
        # Render a minimal HTML list
        items = "".join(f"<li>{r['Lname']} - {r['city']}</li>" for r in rows)
        html = f"<h1>Locations</h1><ul>{items}</ul>"
        return HTMLResponse(content=html)


async def locations_detail(request: Request, location_id: int):
    
        l = await get_location(location_id)
        if not l:
            return HTMLResponse(status_code=404, content="Location not found")
        html = f"<h1>{l['Lname']}</h1><p>{l['address_line1']}, {l['city']}</p>"
        return HTMLResponse(content=html)
