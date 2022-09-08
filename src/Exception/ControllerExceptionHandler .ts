import { Request, Response, NextFunction } from "express";
import ArgumentNotValidException from "../Exceptions/ArgumentNotValidException";
import NotFoundException from "../Exceptions/NotFoundException";
import StandardError from "./StandardError";

export default class ControllerExceptionHandler {
  private request: Request;
  private response: Response;
  private next: NextFunction;
  private error: Error;

  constructor(
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    this.error = error;
    this.request = request;
    this.response = response;
    this.next = next;
    this.callCustomClassError();
  }

  private callCustomClassError(): void | Response<StandardError> {
    if (this.error instanceof NotFoundException) {
      this.notFoundException();
    } else if (this.error instanceof ArgumentNotValidException) {
      this.argumentNotValidException();
    } else {
      const standardError = new StandardError(this.error.message, 500);
      return this.response
        .status(standardError.getStatus())
        .send(standardError);
    }
  }

  public notFoundException(): Response<StandardError> {
    const standardError = new StandardError(this.error.message, 404);
    return this.response.status(standardError.getStatus()).send(standardError);
  }

  public argumentNotValidException(): Response<StandardError> {
    const standardError = new StandardError(this.error.message.split(","), 400);
    return this.response.status(standardError.getStatus()).send(standardError);
  }
}
