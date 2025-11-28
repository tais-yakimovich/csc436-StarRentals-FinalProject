import type { Location } from './location';

describe('Location', () => {
  it('should create an instance', () => {
    const location: Location = {
      location_id: 0,
      Lname: 'Test Location',
      address_line1: '123 Test St',
      address_line2: '',
      city: 'Test City',
      state: 'TS',
      zip_code: 12345,
      country: 'Test Country',
      phone_number: '123-456-7890',
      created_at: '2025-11-26T19:08:47.730Z',
      updated_at: '2025-11-26T19:08:47.730Z',
    };
    expect(location).toBeTruthy();
  });
});