"use strict";

module.exports = function Application (opts) {
  if (!opts || !opts.token) throw new ReferenceError("API.AI client token not defined");
  else {
    this.settings = opts;
    this.text = require("./lib/textRequest")(this.settings);
    this.voice = require("./lib/voiceRequest")(this.settings);
    this.userEntities = require("./lib/userEntitiesRequest")(this.settings);
  }
}
