"use strict";
const form = require("./handlers/form");

module.exports = function (app, opts) {
  app.get("/", form);
};
