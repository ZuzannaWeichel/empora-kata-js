import SmartySDK from "smartystreets-javascript-sdk";

const SmartyCore = SmartySDK.core;

const authId = process.env.SMARTY_AUTH_ID;
const authToken = process.env.SMARTY_AUTH_TOKEN;

const credentials = new SmartyCore.StaticCredentials(authId, authToken);
const clientBuilder = new SmartyCore.ClientBuilder(credentials);

export const sdkClient = clientBuilder.buildUsStreetApiClient();

