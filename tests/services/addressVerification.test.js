jest.mock('../../src/types/InputAddress.js'); 
jest.mock('../../src/lib/sdkClient.js'); 
jest.mock('../../src/utils/outputHelper.js', () => ({
  logError: jest.fn(),
  printCorrectedAddress: jest.fn(),
  printInvalidAddress: jest.fn(),
}));

import { handleDataLookup } from '../../src/services/addressVerification.js';
import InputAddress from '../../src/types/InputAddress.js';
import { sdkClient }  from '../../src/lib/sdkClient.js';
import { logError, printCorrectedAddress, printInvalidAddress } from '../../src/utils/outputHelper.js';

const mockResponse = {
  lookups: [
    { 
      street: '143 e Maine Street',
      city: 'Columbus',
      zipCode: '43215',
      result: [
        { 
          components: {
            primaryNumber: '143',
            streetName: 'Main',
            streetPredirection: 'E',
            streetPostdirection: undefined,
            streetSuffix: 'St',
            cityName: 'Columbus',
            defaultCityName: 'Columbus',
            state: 'OH',
            zipCode: '43215',
            plus4Code: '5370',
            deliveryPoint: '99',
            deliveryPointCheckDigit: '2'
          }
        }
      ]
    }
  ]
};
const row = {Street: '143 e Maine Street', City: 'Columbus', 'Zip Code': '43215' };


describe('handleDataLookup', () => {
  it('should handle data lookup successfully', async () => {    
    sdkClient.send.mockResolvedValue(mockResponse);
    
    await handleDataLookup(row);
    
    expect(sdkClient.send).toHaveBeenCalledWith(new InputAddress(row)); 
  });

  it('should handle error when data lookup fails', async () => {
    const mockError = new Error('Mock error');
    sdkClient.send.mockRejectedValue(mockError); 
    
    await handleDataLookup(row);
    
    expect(sdkClient.send).toHaveBeenCalledWith(new InputAddress(row)); 
    expect(logError).toHaveBeenCalledWith(mockError);
  });
  
  it('should print corrected address for each candidate in the lookup result', async () => {
    sdkClient.send.mockResolvedValue(mockResponse);

    await handleDataLookup(row);

    mockResponse.lookups.forEach(lookup => {
      lookup.result.forEach(candidate => {
        expect(printCorrectedAddress).toHaveBeenCalledWith(lookup, candidate);
      });
    });
  });

  it('should print invalid address when lookup result is empty', async () => {
    const response = {
      lookups: [
        {
          result: []
        }
      ]
    };
    sdkClient.send.mockResolvedValue(response);

    await handleDataLookup(row);

    expect(printInvalidAddress).toHaveBeenCalled();
  });
});