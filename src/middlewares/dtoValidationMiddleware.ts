import { RequestHandler } from "express";
import { sanitize } from "class-sanitizer";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import ArgumentNotValidException from "../Exceptions/ArgumentNotValidException";

function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false,
  bodyValidation = null
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = !bodyValidation
      ? plainToClass(type, req.body)
      : plainToClass(type, req.body[bodyValidation]);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          let errorMessage: string = "";
          errors.forEach((error: ValidationError) => {
            (Object as any)
              .values(error.constraints)
              .forEach((message: string) => {
                errorMessage = errorMessage.concat(
                  `${
                    !bodyValidation
                      ? error.property
                      : `${bodyValidation} - ${error.property}`
                  }: ${message},`
                );
              });
          });

          next(
            new ArgumentNotValidException(
              errorMessage.substring(0, errorMessage.length - 1)
            )
          );
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          !bodyValidation ? (req.body = dtoObj) : req.body;
          next();
        }
      }
    );
  };
}

export default dtoValidationMiddleware;
