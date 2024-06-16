"use strict";
const simple = require("./handlers/simple");
const configured = require("./handlers/configured");

module.exports = function (app, opts) {
  app.get("/", simple);
  app.get("/configured", configured(opts));
};
