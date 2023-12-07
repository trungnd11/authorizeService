import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose"
import HttpException from "../dto/exception/HttpException";
import errorMongoMiddleware from "./errorMongoMiddleware";
import { ValidationError } from "class-validator";
import errorValidatorMiddleware from "./errorValidatorMiddleware";

export default function errorMiddleware(
  error: unknown,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    response.status(status).json({
      status,
      message,
    });
  }
  if (error instanceof Error.ValidationError) {
    errorMongoMiddleware(error, request, response, next);
  }
  if (error?.[0] instanceof ValidationError) {
    errorValidatorMiddleware(error, request, response, next)
  }
  else {
    next(error);
  }
}
