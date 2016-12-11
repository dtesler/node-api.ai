"use strict";

const apiai = require("../apiai");

const Promise = require("bluebird");

module.exports = function (opts) {

  let app = apiai(opts.token, {
    sessionId: opts.session
  }); //=> Attempt connection to api.ai with provided token

  return function (entities, options, callback) { //=> This is the actual apiai.userEntities(entities) function

    if (typeof(options) == "function" && !callback) callback = options;

    let request = (typeof(options) != "function") ? app.userEntitiesRequest(entities, options) : app.userEntitiesRequest(entities); //=> Create new api.ai request

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
