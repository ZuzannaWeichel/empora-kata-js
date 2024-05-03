import Lookup from "smartystreets-javascript-sdk/src/us_street/Lookup.js";

export default class InputAddress extends Lookup{
  constructor(inputData){
    super()
    
    this.street = inputData["Street"],
    this.city = inputData["City"],
    this.zipCode = inputData["Zip Code"]
  }
}