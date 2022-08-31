import { NextFunction, Request, Response } from "express";

async function CatchErrorsHTTP(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    return res
      .status(res.statusCode)
      .json({ error: err.message.split(","), timestamp: new Date().getTime() });
  }

  return res.status(500).json({
    status: "500",
    message: "Server Internal Error",
  });
}

export default CatchErrorsHTTP;
