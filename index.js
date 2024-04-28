const { handleResponse } = require("./src/addressVerification");
const fs = require('fs');
const csv = require('csv-parser');

const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usStreet.Lookup;
const InputAddress = require("./src/InputAddress")


const args = process.argv ;

fs.createReadStream(args[2])
    .on('error', () => {
        console.log("Please provide a valid csv file path")
    })
    .pipe(csv())
    .on('data', (row) => {
        const lookup = new InputAddress(row)
        // console.log(lookup)
 
        handleResponse(lookup)
    })
    .on('end', () => {
        // handle end of CSV
    })