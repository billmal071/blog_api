import { NextFunction, Request, Response } from 'express';

export default function asyncMiddleWare(handler: any) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await handler();
    } catch (err) {
      next(err);
    }
  };
}
