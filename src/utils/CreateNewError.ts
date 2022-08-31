import { Response } from "express";

const CreateNewError = (
  res: Response,
  statusCode: number,
  message: string
): Error => {
  res.status(statusCode);
  return new Error(message);
};

export default CreateNewError;
