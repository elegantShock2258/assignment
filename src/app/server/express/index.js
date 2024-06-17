"use strict";
const express = require("express");
const cors = require("cors");
const httpErrors = require("http-errors");
const pino = require("pino");
const pinoHttp = require("pino-http");

module.exports = function main(options, cb) {
  const ready = cb || function () {};
  const opts = Object.assign({}, options);

  const logger = pino();

  let server;
  let serverStarted = false;
  let serverClosing = false;

  function unhandledError(err) {
    logger.error(err);

    if (serverClosing) {
      return;
    }
    serverClosing = true;

    if (serverStarted) {
      server.close(function () {
        process.exit(1);
      });
    }
  }
  process.on("uncaughtException", unhandledError);
  process.on("unhandledRejection", unhandledError);

  const app = express();
  app.use(
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );
  app.options(
    "*",
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    }),
  );
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(pinoHttp({ logger }));

  require("./routes")(app, opts);

  app.use(function fourOhFourHandler(req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`));
  });

  app.use(function fiveHundredHandler(err, req, res, next) {
    if (err.status >= 500) {
      logger.error(err);
    }
    res.status(err.status || 500).json({
      messages: [
        {
          code: err.code || "InternalServerError",
          message: err.message,
        },
      ],
    });
  });

  server = app.listen(opts.port, opts.host, function (err) {
    if (err) {
      return ready(err, app, server);
    }

    if (serverClosing) {
      return ready(new Error("Server was closed before it could start"));
    }

    serverStarted = true;
    const addr = server.address();
    logger.info(
      `Started at ${opts.host || addr.host || "localhost"}:${addr.port}`,
    );
    ready(err, app, server);
  });
};
