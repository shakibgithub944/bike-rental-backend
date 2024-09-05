import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodValidationError from "../errors/handleZodValidationError";
import { TErrorSources } from "../interfaces/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Internal Server Error!",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedZodError = handleZodValidationError(err);
    statusCode = simplifiedZodError?.statusCode;
    message = simplifiedZodError?.message;
    errorSources = simplifiedZodError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedMongooseValidationError = handleValidationError(err);
    statusCode = simplifiedMongooseValidationError?.statusCode;
    message = simplifiedMongooseValidationError?.message;
    errorSources = simplifiedMongooseValidationError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedMongooseCastError = handleCastError(err);
    statusCode = simplifiedMongooseCastError?.statusCode;
    message = simplifiedMongooseCastError?.message;
    errorSources = simplifiedMongooseCastError?.errorSources;
  } else if (err?.code === "11000") {
    const simplifiedMongooseDuplicateError = handleDuplicateError(err);
    statusCode = simplifiedMongooseDuplicateError?.statusCode;
    message = simplifiedMongooseDuplicateError?.message;
    errorSources = simplifiedMongooseDuplicateError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
