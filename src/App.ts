import express from "express";
import BaseController from "./controllers/BaseController";
import mongoose from "mongoose";
import config from "./config";

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
  }

  private connectDB() {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(
        this.mongoAtlasUri, { },
        () => console.log("Mongoose is connected")
      );
    } catch (e) {
      console.log("could not connect", e);
      process.exit();
    }
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: BaseController[]) {
    this.app.get("/", (request, response) => {
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