const Lookup = require("smartystreets-javascript-sdk/src/us_street/Lookup");

class InputAddress extends Lookup{
  constructor(inputData){
    super()
    
    this.street = inputData["Street"],
    this.city = inputData["City"],
    this.zipCode = inputData["Zip Code"]
  }
}

module.exports = InputAddress