import { NextFunction, Request, Response } from 'express';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(200).json({
    message: err,
    success: false,
  });
}
