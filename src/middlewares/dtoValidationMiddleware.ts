import { RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize } from "class-sanitizer";
import ThrowNewError from "../utils/CreateNewError";

function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          let errorMessage: string = "";
          errors.forEach((error: ValidationError) => {
            (Object as any)
              .values(error.constraints)
              .forEach((message: string) => {
                errorMessage = errorMessage.concat(
                  `${error.property}: ${message},`
                );
              });
          });

          next(
            ThrowNewError(
              res,
              400,
              errorMessage.substring(0, errorMessage.length - 1)
            )
          );
          
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      }
    );
  };
}

export default dtoValidationMiddleware;
