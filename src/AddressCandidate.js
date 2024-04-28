const Lookup = require("smartystreets-javascript-sdk/src/us_street/Lookup");

class AddressCandidate extends Lookup{
  constructor(data){
    super()
    this.result = data
  }

  toString(){
    const { primaryNumber, secondaryNumber, streetName, streetPredirection, streetPostdirection, streetSuffix, cityName, zipCode, plus4Code } = this.result.components;
    const street = [streetPredirection, streetName, streetPostdirection, streetSuffix].filter(e => !!e).join(" ")
    
    return `${primaryNumber} ${street}, ${cityName}, ${zipCode}-${plus4Code}`;
  }
}
module.exports = AddressCandidate