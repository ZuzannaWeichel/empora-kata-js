import 'dotenv/config';
import fs from 'fs';
import csv from 'csv-parser';
import { isValidCSVrow } from './src/utils/validationHelper.js';
import { invalidRowMessage, logError } from './src/utils/outputHelper.js';
import { handleDataLookup } from './src/services/addressVerification.js';


const args = process.argv;

fs.createReadStream(args[2])
    .on('error', (e) => {
        logError(e);
    })
    .pipe(csv())
    .on('data', (row) => {
        if (isValidCSVrow(row)){
            handleDataLookup(row);
        } else {
            invalidRowMessage(row);
        }
    })
    .on('end', () => {
        // handle end of CSV
    });