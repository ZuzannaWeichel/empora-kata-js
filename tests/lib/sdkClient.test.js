import { sdkClient } from '../../src/lib/sdkClient.js';
import InputAddress from '../../src/types/InputAddress.js';

describe('sdkClient', () => {
  it('should be authenticated', () => {
    expect(process.env.SMARTY_AUTH_ID).toBeDefined();
    expect(process.env.SMARTY_AUTH_TOKEN).toBeDefined();
  });

  it('should return response', async () => {
    const lookup = new InputAddress({ Street: '143 e Maine Street', City: 'Columbus', 'Zip Code': '43215' });
 
    const response = await sdkClient.send(lookup);

    expect(response).toMatchSnapshot();
  });
});