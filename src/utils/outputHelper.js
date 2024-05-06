import AddressCandidate from "../types/AddressCandidate.js";

export function invalidRowMessage(row){
  console.log("Invalid row", row);
}

export function logError(error){
  console.log("Error", error);
}

export function printCorrectedAddress(lookup, candidate ){
  const correctedAddress = new AddressCandidate(candidate);
  console.log(`${lookup.street}, ${lookup.city}, ${lookup.zipCode} ->  ${correctedAddress.toString()}`);
}

export function printInvalidAddress(lookup){
  console.log(`${lookup.street}, ${lookup.city}, ${lookup.zipCode} ->  Invalid Address`);
}