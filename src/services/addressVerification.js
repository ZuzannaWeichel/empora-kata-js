import InputAddress from '../types/InputAddress.js';
import { sdkClient }  from '../lib/sdkClient.js';
import { logError, printCorrectedAddress, printInvalidAddress } from '../utils/outputHelper.js';

export async function handleDataLookup(row){
	const lookup = new InputAddress(row)
	try {
		const response = await sdkClient.send(lookup);
		response.lookups.map(lookup => {
			if(lookup.result.length > 0) {
				lookup.result.map(candidate => {
					printCorrectedAddress(lookup, candidate)
				})
			}else{
				printInvalidAddress(lookup)
			}
		})
	} catch(err) {
		logError(err);
	}
}
