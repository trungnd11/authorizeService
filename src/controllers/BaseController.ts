import express from "express";

export default abstract class BaseController {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }
  public abstract initializeRoutes(): void;
}