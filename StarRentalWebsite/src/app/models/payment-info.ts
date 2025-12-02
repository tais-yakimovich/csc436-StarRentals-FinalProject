export interface PaymentInfo {
  payment_id: number;
  cardholder_name: string;
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvv: string;
  billing_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  user_id: number;
}