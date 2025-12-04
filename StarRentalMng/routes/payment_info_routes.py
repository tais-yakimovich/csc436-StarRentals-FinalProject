from fastapi import APIRouter, HTTPException
from database import database
from schemas.payment_info import PaymentInfo, PaymentID
from crud.payment_info_crud import (
    get_payment_infos,
    get_payment_id_for_user,
    get_payment_info,
    create_payment_info,
    delete_payment_info,
)
from crud.payment_info_crud import update_payment_info

router = APIRouter(prefix="/api/payment_info", tags=["PaymentInfo"])


@router.get("/", response_model=list[PaymentInfo])
async def api_get_payment_infos(skip: int = 0, limit: int = 10):
    
        rows = await get_payment_infos(skip, limit)
        return [PaymentInfo(**dict(r)) for r in rows]


@router.get("/{payment_id}", response_model=PaymentInfo)
async def api_get_payment_info(payment_id: int):
    
        p = await get_payment_info(payment_id)
        if not p:
            raise HTTPException(404, "Payment info not found")
        return PaymentInfo(**p)

@router.get("/user/{user_id}", response_model=list[PaymentID])
async def api_get_payment_infos_by_user(user_id: int):
    
        rows = await get_payment_id_for_user(user_id)
        return [PaymentID(**dict(r)) for r in rows]


@router.post("/", response_model=PaymentInfo)
async def api_create_payment_info(payment_info: PaymentInfo):
    
        try:
            payment_id = await create_payment_info(
                payment_info.cardholder_name,
                payment_info.card_number,
                payment_info.exp_month,
                payment_info.exp_year,
                payment_info.cvv,
                getattr(payment_info, 'billing_address', None),
                getattr(payment_info, 'city', None),
                getattr(payment_info, 'state', None),
                getattr(payment_info, 'zip_code', None),
                getattr(payment_info, 'country', None),
                getattr(payment_info, 'user_id', None),
            )
            payment_info.payment_id = payment_id
            return payment_info
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))


@router.delete("/{payment_id}")
async def api_delete_payment_info(payment_id: int):
    
        deleted = await delete_payment_info(payment_id)
        if deleted == 0:
            raise HTTPException(404, "Payment info not found")
        return {"detail": "Payment info deleted"}

@router.put("/", response_model=PaymentInfo)
async def api_update_payment_info(payment_info: PaymentInfo):
    
        try:
            await update_payment_info(
                payment_info.payment_id,
                payment_info.cardholder_name,
                payment_info.card_number,
                payment_info.exp_month,
                payment_info.exp_year,
                payment_info.cvv,
                getattr(payment_info, 'billing_address', None),
                getattr(payment_info, 'city', None),
                getattr(payment_info, 'state', None),
                getattr(payment_info, 'zip_code', None),
                getattr(payment_info, 'country', None),
                getattr(payment_info, 'user_id', None),
            )
            return payment_info
        except Exception as err:
            raise HTTPException(status_code=400, detail=str(err))
