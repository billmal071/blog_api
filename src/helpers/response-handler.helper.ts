import { Response } from 'express';

export function responseHandler(
  res: Response,
  message: string,
  statusCode: number = 501,
  success: boolean = false,
  data: unknown,
) {
  res.status(statusCode).json({
    success,
    message,
    data: {
      message,
      data,
    },
  });
}

export const successResponse = (res: Response, statusCode = 200, data: unknown = {}) => {
  res.status(statusCode).json({ data });
};

export const errorResponse = (res: Response, message: string, statusCode: number = 500, error: unknown = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
