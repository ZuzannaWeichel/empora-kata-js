jest.mock('../../src/services/addressVerification.js', () => ({
  handleDataLookup: jest.requireActual('../../src/services/addressVerification').handleDataLookup, // if handleDataLookup is implemented
  handleResponse: jest.fn(),
}));
jest.mock('../../src/types/InputAddress.js'); // Mocking InputAddress module
jest.mock('../../src/lib/sdkClient.js'); // Mocking sdkClient module
jest.mock('../../src/utils/outputHelper.js', () => ({
  logError: jest.fn(),
  printCorrectedAddress: jest.fn(),
  printInvalidAddress: jest.fn(),
}));

import { handleResponse, handleDataLookup } from '../../src/services/addressVerification.js'; // replace 'yourFileName.js' with the actual file name
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

describe('handleResponse', () => {
  it('should print corrected address for each candidate in the lookup result', () => {

    handleResponse(mockResponse);

    mockResponse.lookups.forEach(lookup => {
      lookup.result.forEach(candidate => {
        const { components } = candidate;
        expect(printCorrectedAddress).toHaveBeenCalledWith(lookup, components);
      });
    });
  });

  it('should print invalid address when lookup result is empty', () => {
    const response = {
      lookups: [
        {
          result: []
        }
      ]
    };
    
    handleResponse(response);

    expect(printInvalidAddress).toHaveBeenCalled();
  });
});


describe('handleDataLookup', () => {
  it('should handle data lookup successfully', async () => {
    const row = { Street: '143 e Maine Street', City: 'Columbus', 'Zip Code': '43215' };
    
    sdkClient.send.mockResolvedValue(mockResponse); // mocking sdkClient.send to resolve with mockResult
    
    await handleDataLookup(row);
    
    expect(sdkClient.send).toHaveBeenCalledWith(new InputAddress(row)); // expects sdkClient.send to be called with InputAddress instance
    expect(handleResponse).toHaveBeenCalledWith(mockResponse); // expects handleResponse to be called with mocked result
  });

  it('should handle error when data lookup fails', async () => {
    const row = {Street: '143 e Maine Street', City: 'Columbus', 'Zip Code': '43215' };
    const mockError = new Error('Mock error');
    sdkClient.send.mockRejectedValue(mockError); // mocking sdkClient.send to reject with mockError
    
    await handleDataLookup(row);
    
    expect(sdkClient.send).toHaveBeenCalledWith(new InputAddress(row)); // expects sdkClient.send to be called with InputAddress instance
    expect(logError).toHaveBeenCalledWith(mockError); // expects logError to be called with mockError
  });
});

