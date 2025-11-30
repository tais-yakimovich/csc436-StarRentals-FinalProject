export interface Location {
  location_id: number;
  Lname: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: number;
  country: string;
  phone_number: string;
  email: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}