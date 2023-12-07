import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

export default function errorMongoMiddleware(err: Error, _req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error.ValidationError) {
    const message = getFirstErrorMessage(err);
    if (message) {
      res.status(400).json({
        status: 400,
        message,
      });
    }
  };
}

function getFirstErrorMessage(err: Error.ValidationError): string | null {
  if (!err || !err.errors) {
    return null;
  }

  for (const field in err.errors) {
    if (Object.prototype.hasOwnProperty.call(err.errors, field)) {
      return err.errors[field].message;
    }
  }

  return null;
}