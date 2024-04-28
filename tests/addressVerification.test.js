const InputAddress = require('../src/InputAddress')
const { handleResponse } = require('../src/addressVerification')

// Mocking the client's send method
jest.mock('smartystreets-javascript-sdk', () => {
  const mockResponse = {
    lookups: [
      {
        street: '143 e Maine Street',
        street2: undefined,
        secondary: undefined,
        city: 'Columbus',
        state: undefined,
        zipCode: '43215',
        lastLine: undefined,
        addressee: undefined,
        urbanization: undefined,
        match: undefined,
        maxCandidates: undefined,
        inputId: undefined,
        result: [{
          inputIndex: 0,
          candidateIndex: 0,
          addressee: undefined,
          deliveryLine1: '143 E Main St',
          deliveryLine2: undefined,
          lastLine: 'Columbus OH 43215-5370',
          deliveryPointBarcode: '432155370992',
          smartyKey: undefined,
          components: {
            urbanization: undefined,
            primaryNumber: '143',
            streetName: 'Main',
            streetPredirection: 'E',
            streetPostdirection: undefined,
            streetSuffix: 'St',
            secondaryNumber: undefined,
            secondaryDesignator: undefined,
            extraSecondaryNumber: undefined,
            extraSecondaryDesignator: undefined,
            pmbDesignator: undefined,
            pmbNumber: undefined,
            cityName: 'Columbus',
            defaultCityName: 'Columbus',
            state: 'OH',
            zipCode: '43215',
            plus4Code: '5370',
            deliveryPoint: '99',
            deliveryPointCheckDigit: '2'
          },
        }
        ]
      }
    ]
  }
  return {
    core: {
      StaticCredentials: jest.fn(),
      ClientBuilder: jest.fn().mockImplementation(() => ({
        buildUsStreetApiClient: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(mockResponse)
        }),
      })),
    },
  };
});

describe('handleResponse', () => {
  it('should call handleSuccess when client send is successful', async () => {
    const lookup = new InputAddress("143 e Maine Street,Columbus,43215")

    const mockHandleSuccess = jest.fn();
    const mockHandleError = jest.fn();
    jest.mock('../src/addressVerification', () => ({
      handleSuccess: mockHandleSuccess,
      handleError: mockHandleError
    }));

    await handleResponse(lookup);

    expect(mockHandleSuccess).toHaveBeenCalled();
  });
  it('should return corrected street address when candidate found', () => {
    const lookup = new InputAddress("143 e Maine Street,Columbus,43215")


  })
});
