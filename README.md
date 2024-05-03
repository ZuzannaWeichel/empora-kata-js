# empora-kata-js

## Overview
This is a node.js application for verification of US addresses. Using a Smarty SDK - smartystreets-javascript-sdk

### How to:

#### run the app

install node
``` 
brew install node
```
install dependencies
```
npm install
```
run application command
```
SMARTY_AUTH_ID=your-auth SMARTY_AUTH_TOKEN=your-token node index.js your-data-input.csv
```
#### run tests
  * setup local `.env` with envvars and your keys 
 
```
SMARTY_AUTH_ID
SMARTY_AUTH_TOKEN
```

```
npm run test
```

