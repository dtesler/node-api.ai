"use strict";

const apiai = require("../apiai");

const Promise = require("bluebird");

module.exports = function (opts) {

  let app = apiai(opts.token); //=> Attempt connection to api.ai with provided token

  return function (text, options, callback) { //=> This is the actual apiai.text("hey there") function

    if (typeof(options) == "function" && !callback) callback = options;

    if (typeof(options) == "object") options.sessionId = opts.session;

    if (typeof(callback) != "function") return new Promise(function (resolve, reject) { //=> Cause promises are awesome

      if (typeof(text) != "string") return reject(new TypeError("First argument passed into apiai.text() must be of type String"));

      let request = (typeof(options) != "function") ? app.textRequest(text, options) : app.textRequest(text, { sessionId: opts.session }); //=> Create new api.ai request

      request.on("response", resolve);

      request.on("error", reject);

      request.end();

    });
    else { //=> Just in case you prefer callbacks, within code, consistency is key

      if (typeof(text) != "string") return callback(new TypeError("First argument passed into apiai.text() must be of type String"));

      let request = (typeof(options) != "function") ? app.textRequest(text, options) : app.textRequest(text, { sessionId: opts.session }); //=> Create new api.ai request

      request.on("response", function (response) {
        callback(null, response); //=> No error, callback with response
      });

      request.on("error", callback); //=> Callback with error.  Please do check if (err).

      request.end();
    }

  }
}
