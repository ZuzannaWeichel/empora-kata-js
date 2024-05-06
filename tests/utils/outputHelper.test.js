import { invalidRowMessage, logError, printCorrectedAddress, printInvalidAddress } from '../../src/utils/outputHelper.js';

describe('outputHelper', () => {
  let logSpy;
  beforeEach(() =>{
    logSpy = jest.spyOn(global.console, 'log');
  });
  afterEach(() =>{
    logSpy.mockRestore();
  });
  describe('invalidRowMessage', ()=>{
    it('should print message and row', () => {
      const rowNoZipCode = { Street: '143 e Maine Street', City: 'Columbus', State: 'OH' };
  
      invalidRowMessage(rowNoZipCode);
      
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Invalid row", {"City": "Columbus", "State": "OH", "Street": "143 e Maine Street"});
    });
  });

  describe('logError', ()=>{
    it('should print error', () => {
      const err = "some error";
  
      logError(err);
      
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("Error", err);
    });
  });

  describe('printCorrectedAddress', ()=>{
    it('should print corrected address', () => {
      const lookup =  {
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
        result: [Array]
      };
      const candidate =  {
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
        }
      };

      printCorrectedAddress(lookup, candidate);
      
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("143 e Maine Street, Columbus, 43215 ->  143 E Main St, Columbus, 43215-5370");
    });
  });
  describe('printInvalidAddress', ()=>{
    it('should print error', () => {
      const lookup =  {
        street: '1 Empora St',
        street2: undefined,
        secondary: undefined,
        city: 'Title',
        state: undefined,
        zipCode: '11111',
        lastLine: undefined,
        addressee: undefined,
        urbanization: undefined,
        match: undefined,
        maxCandidates: undefined,
        inputId: undefined,
        result: [Array]
      };

      printInvalidAddress(lookup);
      
      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith("1 Empora St, Title, 11111 ->  Invalid Address");
    });
  });
});