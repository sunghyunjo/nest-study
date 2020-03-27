import { Connection } from "typeorm";

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerMiddleware } from "./common/logger.middleware";
import { User } from "./user/user.entity";
import { Food } from "./user/food.entity";
import { UserModule } from "./user/user.module";
import { VersionModule } from "./version/version.module";

@Module({
  imports: [
    VersionModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "shcho",
      password: "password",
      database: "test",
      entities: [User, Food],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  // route를 조건으로 등록하는 방법
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }
}
