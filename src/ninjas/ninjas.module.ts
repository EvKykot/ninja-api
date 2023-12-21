import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { AuthorizationMiddleware } from 'src/middlewares/authorization/authorization.middleware';
import { BeltLevelMiddleware } from 'src/middlewares/belt-level/belt-level.middleware';

@Module({
  controllers: [NinjasController],
  providers: [NinjasService],
})
export class NinjasModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthorizationMiddleware).forRoutes('ninjas');
    // consumer.apply(AuthorizationMiddleware).forRoutes(NinjasController);
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(
        { path: 'ninjas', method: RequestMethod.POST },
        { path: 'ninjas/:id', method: RequestMethod.DELETE },
      )
      .apply(BeltLevelMiddleware)
      .forRoutes(
        { path: 'ninjas', method: RequestMethod.POST },
        { path: 'ninjas/:id', method: RequestMethod.DELETE },
      );
  }
}
