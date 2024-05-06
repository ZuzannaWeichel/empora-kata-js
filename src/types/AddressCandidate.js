import Lookup from "smartystreets-javascript-sdk/src/us_street/Lookup.js";

export default class AddressCandidate extends Lookup{
  constructor(data){
    super();
    this.result = data;
  }

  toString(){
    const { primaryNumber, streetName, streetPredirection, streetPostdirection, streetSuffix, cityName, zipCode, plus4Code } = this.result.components;
    const street = [streetPredirection, streetName, streetPostdirection, streetSuffix].filter(e => !!e).join(" ");
    
    return `${primaryNumber} ${street}, ${cityName}, ${zipCode}-${plus4Code}`;
  }
}
