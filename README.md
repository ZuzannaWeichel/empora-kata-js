# empora-kata-js

## Overview
This is a node.js application for verification of US addresses. Using a Smarty SDK - smartystreets-javascript-sdk

### How to:
---
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
* setup local `.env` file at the root of the project
* add envvars and your keys
* *keep it secret, keep it safe*

Tests for the sdkClient are attempting to make an actual call to the endpoint so if you don't setup your credentials those tests will fail.
All other test are mocked or isolated.
```
SMARTY_AUTH_ID=your-smarty-auth-id
SMARTY_AUTH_TOKEN=your-smarty-auth-token
```
```
npm run test
```

### Project structure
---
```
project_root
│
├── src
│   ├── lib
│   │     └── sdkClient.js
│   ├── services
│   │     └── addressVerification.js
│   ├── types
│   │     └── InputAddress.js
│   │     └── AddressCandidate.js
│   └── utils
│         └── outputHelper.js
│         └── validationHelper.js
│
└── test
    ├── lib
    │     └── sdkClient.test.js
    ├── services
    │     └── addressVerification.test.js
    └── utils
          └── outputHelper.test.js
          └── validationHelper.test.js
```

 * lib - stuff related to third party libraries
 * services - functions related to business logic
 * types - to keep things tidy and typed
 * utils - for more generic helper functions 
 * tests - containing unit tests for the corresponding files in src