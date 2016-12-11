# api.ai (node.js)

This plugin allows the integration of agents from the [api.ai](http://api.ai) natural language processing service with your Node.js application.

## Installation

```shell
  npm install --save api.ai
```

## Usage

#### Initializing the module


Your client access token can be obtained in your [Dashboard](https://console.api.ai).

```javascript
const apiai = require("api.ai");

const nlp = new apiai({
  token: "<your client access token>",
  session: "<unique session id>"
});
```

#### Handling responses

This module supports both callbacks and promises to deliver your data.

##### Callbacks:

```javascript

nlp.text("Hello World!", function (error, response) {
  if (error) {
    // Handle Error
  }
  else {
    // Do what you wish with response
  }
});

```

##### Promises:

```javascript

nlp.text("Hello World!")
.then(function (response) {
  // Do what you wish with response
})
.error(function (error) {
  // Handle error
});

```

#### Making requests

This module supports making 3 different types of requests to api.ai:
- Text requests
- Voice requests
- User entities requests

##### Text requests

These are the simplest of the above.  Simply send text to api.ai to be processed:

```javascript
nlp.text("Hello World", callback);
```

##### Voice requests

To send a voice request, you may either provide a buffer or the path of an audio file:

```javascript
nlp.voice("hello_world.wav", callback);
```

You may also specify additional options, for instance - language:

```javascript
nlp.voice("hello_world.wav", {
  language: "en"
}, callback);
```

##### User Entity requests

```javascript
nlp.userEntities(user_entities, callback);
```

This module was created by [David Tesler](https://github.com/dtesler), using the original [Node.JS SDK for api.ai](https://github.com/api-ai/api-ai-node-js)

Awesomeness supplied by [api.ai](http://api.ai).
