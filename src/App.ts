import "reflect-metadata";
import express from "express";
import BaseController from "./controllers/BaseController";
import mongoose from "mongoose";
import config from "./config";
import errorMiddleware from "./middlewares/errorMiddleware";
import { corsMiddleware } from "./middlewares/corsMiddleware";

export default class App {
  private app: express.Application;
  private port: number | string;
  private mongoAtlasUri: string = config.databaseUri;

  constructor(controllers: BaseController[], port: number | string) {
    this.app = express();
    this.port = port;

    this.connectDB();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private connectDB() {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(this.mongoAtlasUri, {}, () =>
        console.log("Mongoose is connected")
      );
    } catch (e) {
      console.log("could not connect", e);
      process.exit();
    }
  }

  private initializeMiddlewares() {
    this.app.use(corsMiddleware);
    this.app.use(express.json());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: BaseController[]) {
    this.app.get("/", (_request, response) => {
      response.send("Application is running");
    });
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}