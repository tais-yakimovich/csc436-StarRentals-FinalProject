from database import database
from typing import Optional, List


async def get_payment_infos(skip: int = 0, limit: int = 10):
    query = """
        SELECT
            payment_id,
            cardholder_name,
            card_number,
            exp_month,
            exp_year,
            cvv,
            billing_address,
            city,
            state,
            zip_code,
            country,
            user_id
        FROM payment_info
        LIMIT :limit OFFSET :skip
    """
    return await database.fetch_all(query=query, values={"limit": limit, "skip": skip})


async def get_payment_info(payment_id: int):
    query = """
        SELECT
            payment_id,
            cardholder_name,
            card_number,
            exp_month,
            exp_year,
            cvv,
            billing_address,
            city,
            state,
            zip_code,
            country,
            user_id
        FROM payment_info
        WHERE payment_id = :payment_id
    """
    row = await database.fetch_one(query=query, values={"payment_id": payment_id})
    return dict(row) if row else None


async def create_payment_info(
    payment_id: int,
    cardholder_name: str,
    card_number: str,
    exp_month: str,
    exp_year: str,
    cvv: str,
    billing_address: Optional[str],
    city: Optional[str],
    state: Optional[str],
    zip_code: Optional[str],
    country: Optional[str],
    user_id: Optional[int],
) -> int:
    query = """
        INSERT INTO payment_info (
            payment_id,
            cardholder_name,
            card_number,
            exp_month,
            exp_year,
            cvv,
            billing_address,
            city,
            state,
            zip_code,
            country,
            user_id
        ) VALUES (
            :payment_id,
            :cardholder_name,
            :card_number,
            :exp_month,
            :exp_year,
            :cvv,
            :billing_address,
            :city,
            :state,
            :zip_code,
            :country,
            :user_id
        )
    """
    await database.execute(query=query, values={
        "payment_id": payment_id,
        "cardholder_name": cardholder_name,
        "card_number": card_number,
        "exp_month": exp_month,
        "exp_year": exp_year,
        "cvv": cvv,
        "billing_address": billing_address,
        "city": city,
        "state": state,
        "zip_code": zip_code,
        "country": country,
        "user_id": user_id,
    })
    return payment_id


async def delete_payment_info(payment_id: int) -> int:
    query = "DELETE FROM payment_info WHERE payment_id = :payment_id"
    return await database.execute(query=query, values={"payment_id": payment_id})
