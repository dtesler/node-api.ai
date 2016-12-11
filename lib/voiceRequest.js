"use strict";

const apiai = require("../apiai");

const Promise = require("bluebird");

const fs = require("fs");

module.exports = function (opts) {

  return function (voice, options, callback) { //=> This is the actual apiai.voice("hiya.wav") function

    if (typeof(options) == "function" && !callback) {
      callback = options;
      options = {
        sessionId: opts.session,
        language: "en"
      };
    };

    if (!options) options = {
      sessionId: opts.session,
      language: "en"
    };

    let app = apiai(opts.token, options); //=> Attempt connection to api.ai with provided token

    let request = app.voiceRequest();

    if (typeof(voice) == "string") request.write(fs.readFileSync(voice));
    else request.write(voice);

    if (typeof(callback) != "function") return new Promise(function (resolve, reject) { //=> Cause promises are awesome

      request.on("response", resolve);

      request.on("error", reject);

    });
    else { //=> Just in case you prefer callbacks, within code, consistency is key

      request.on("response", function (response) {
        callback(null, response); //=> No error, callback with response
      });

      request.on("error", callback); //=> Callback with error.  Please do check if (err).

    }

    request.end();

  }
}
