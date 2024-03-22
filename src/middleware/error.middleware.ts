import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof AuthenticationError) {
    res.status(401).json({
      message: "Unauthorized: " + (err.message || "Invalid acces token"),
    });
  } else {
    if (err instanceof ResourceError) {
      res.status(422).json({
        message: "Unable to process request: " + (err.message || "Bad Request"),
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class ResourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ResourceError";
  }
}
export { errorHandler, AuthenticationError, ResourceError };
