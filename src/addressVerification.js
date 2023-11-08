const SmartySDK = require("smartystreets-javascript-sdk");
const Candidate = require("smartystreets-javascript-sdk/src/us_street/Candidate");
const AddressCandidate = require("./AddressCandidate");
const InputAddress = require("./InputAddress");
const SmartyCore = SmartySDK.core;

let authId = process.env.SMARTY_AUTH_ID;
let authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyCore.StaticCredentials(authId, authToken);

let clientBuilder = new SmartyCore.ClientBuilder(credentials);
let client = clientBuilder.buildUsStreetApiClient();

function handleSuccess(response) {
	response.lookups.map(lookup => {
		if(lookup.result.length > 0) {
			console.log("lookup", lookup)
			lookup.result.map(candidate => {
				console.log("candidate", candidate)
				const correctedAddress = new AddressCandidate(candidate)
				console.log(`${lookup.street}, ${lookup.city}, ${lookup.zipCode} ->  ${correctedAddress.toString()}`)
			})

			// lookup.result.map(candidate => console.log(`${lookup.street}, ${lookup.city},${lookup.zipCode} -> ${candidate.components.primaryNumber} ${candidate.components.secondaryNumber} ${candidate.components.streetPredirection} ${candidate.components.streetName} ${candidate.components.streetPostdirection} ${candidate.components.streetSuffix}, ${candidate.components.cityName}, ${candidate.components.zipCode}-${candidate.components.plus4Code}`))
		}else{
			console.log(`${lookup.street}, ${lookup.city}, ${lookup.zipCode} ->  Invalid Address`)
		}
	})
}

function handleError(error) {
	console.log(error);
}

async function handleResponse(lookup) {
	try {
		const result = await client.send(lookup);
		handleSuccess(result);
	} catch(err) {
		handleError(err);
	}
}

module.exports = { handleResponse }