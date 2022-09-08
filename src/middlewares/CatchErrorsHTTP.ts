import { NextFunction, Request, Response } from "express";
import ControllerExceptionHandler from "../Exception/ControllerExceptionHandler ";
import StandardError from "../Exception/StandardError";

async function CatchErrorsHTTP(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    return new ControllerExceptionHandler(err, req, res, next);
  }

  return res.status(500).send(new StandardError("server internal Error", 500));
}

export default CatchErrorsHTTP;
