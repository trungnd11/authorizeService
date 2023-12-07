import { ValidationError } from "class-validator";
import { NextFunction } from "express";
import { Request, Response } from "express";
import ArrayUtils from "../utils/ArrayUtils";

export default function errorValidatorMiddleware(err: unknown, _req: Request, res: Response, next: NextFunction) {
  if (err?.[0] instanceof ValidationError) {
    const error = err as ValidationError[];
    const message = getCustomErrorMessages(error);
    if (!ArrayUtils.isNullOrEmpty(message)) {
      res.status(400).json({
        status: 400,
        message,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }
  };
}

function getCustomErrorMessages(errors: ValidationError[]) {
  let listError = [];
  errors.forEach(error => {
    const constraints = error.constraints;
    if (constraints) {
      const constraintEntries = Object.entries(constraints);
      if (constraintEntries.length > 0) {
        const errorsMess = constraintEntries.map(item => item?.[1]).filter(message => message).reverse();
        listError = errorsMess;
      }
    }
  });
  return listError;
}