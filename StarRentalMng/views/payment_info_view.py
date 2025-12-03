from fastapi import Request
from fastapi.responses import HTMLResponse
from database import database
from crud.payment_info_crud import get_payment_infos, get_payment_info


async def payment_info_list(request: Request):
    
        rows = await get_payment_infos(0, 50)
        items = "".join(f"<li>{r['cardholder_name']} - ****{r['card_number'][-4:]}</li>" for r in rows)
        html = f"<h1>Payment Info</h1><ul>{items}</ul>"
        return HTMLResponse(content=html)


async def payment_info_detail(request: Request, payment_id: int):
    
        p = await get_payment_info(payment_id)
        if not p:
            return HTMLResponse(status_code=404, content="Payment info not found")
        html = f"<h1>{p['cardholder_name']}</h1><p>****{p['card_number'][-4:]}</p>"
        return HTMLResponse(content=html)
