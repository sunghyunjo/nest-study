import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { VersionModule } from "./version/version.module";
import { UserModule } from "./user/user.module";
import { LoggerMiddleware } from "./common/logger.middleware";

@Module({
  imports: [VersionModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  // route를 조건으로 등록하는 방법
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}
