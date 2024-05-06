# empora-kata-js

## Overview
This is a node.js application for verification of US addresses. Using a Smarty SDK - smartystreets-javascript-sdk

### How to:
---
#### run the app

* install node
``` 
brew install node
```
* install dependencies
```
npm install
```
* run application command
```
SMARTY_AUTH_ID=your-auth SMARTY_AUTH_TOKEN=your-token node index.js your-data-input.csv
```
#### run tests
* setup local `.env` file at the root of the project
* add envvars and your keys
* *keep it secret, keep it safe*

Tests for the sdkClient are attempting to make an actual call to the endpoint so if you don't setup your credentials those tests will fail.
All other test are mocked or encapsulated.
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

For this exercise I've decided to go with Node.js framework and JavaScript mainly because those are the technologies I've worked with most recently however Python or Ruby would have been just as fine.
For testing I'm using Jest and for my secrets ".env" file with dotenv package. I didn't add integration or end to end testing but I'm testing the sdk client with the real call, that's why I needed some mechanism to access and locally store the credentials.

I decided to split my code into `src` and `test` however I've also worked in codebases where test files are closer together in the same folder as the production code. I think both of those approaches have their own pluses and minuses. 
 
 This project is very tiny but I was trying to divide it into logical modules.
* lib - stuff related to third party libraries
* services - functions related to business logic
* types - to keep things tidy and typed
* utils - for more generic helper functions 
* tests - containing unit tests for the corresponding files in src
 
 
App's entry point is `index.js` file that reads the secrets and csv input from the arguments give with the terminal command. Then it parses over each line of the given data and calls into addressVerification service to handle the data lookup. The `handleDataLookup` function calls the api and then with the `outputHelper` prints the corrected and failed addresses to the console. I've noticed that data sample didn't have state (i.e. OH) and I was wondering if that was intentional.