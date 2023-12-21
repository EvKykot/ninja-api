import {
  // HttpException,
  // HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const { authorization } = req.headers;

    // if (!authorization) {
    //   throw new HttpException('No authorization token', HttpStatus.FORBIDDEN);
    // } else if (authorization === blaBla) {
    // next();
    // } else {
    //   throw new HttpException('Invalid authorization token', HttpStatus.FORBIDDEN);
    // }

    // TODO: need to check authorization tocken
    next();
  }
}
