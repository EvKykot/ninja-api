import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizationMiddleware } from '../middlewares/authorization/authorization.middleware';
import { BeltLevelMiddleware } from '../middlewares/belt-level/belt-level.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.DELETE },
      )
      .apply(BeltLevelMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/:id', method: RequestMethod.DELETE },
      );
  }
}
