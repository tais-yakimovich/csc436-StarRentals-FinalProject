export interface User {
  user_id: number;
  username: string;
  password_hash: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string; // ISO date string (e.g., "YYYY-MM-DD")
  driver_license_number: number;
  driver_license_state: string;
  address_line1: string;
  address_line2?: string; // Optional
  city: string;
  state: string;
  zip_code: number;
  country: string;
  created_at: string; // ISO date-time string (e.g., "YYYY-MM-DDTHH:mm:ss")
}