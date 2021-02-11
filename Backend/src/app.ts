import express, { NextFunction, Request, Response } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "./services/server.js";
import { createSocket } from "./services/socket.io.js";
import passport from "./services/passport";

import Router from "./routes/v1/rest/index";

const app = express();
export default app;

const server = createServer(app);
createSocket(server);

import "./services/mongodb";
import "./services/session";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "app")));

//Configure App
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(Router);

//app.use(csrf());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  (err as any).status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send(err.message);
});
