import { isValidCSVrow } from '../../src/utils/validationHelper.js';

describe('isValidCSV', () => {
  it('should return true if the row has street, city and zip code', ()=>{
    const row = { Street: '143 e Maine Street', City: 'Columbus', 'Zip Code': '43215' };

    expect(isValidCSVrow(row)).toBe(true);
  });
  it('should return false if the row does not have street or city or zip code', ()=>{
    const rowNoZipCode = { Street: '143 e Maine Street', City: 'Columbus', State: 'OH' };
    const rowNoStreet = {City: 'Columbus', State: 'OH', 'Zip Code': '43215' };
    const rowNoCity = { Street: '143 e Maine Street', State: 'OH', 'Zip Code': '43215' };

    expect(isValidCSVrow(rowNoCity)).toBe(false);
    expect(isValidCSVrow(rowNoStreet)).toBe(false);
    expect(isValidCSVrow(rowNoZipCode)).toBe(false);

  });
});