import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerMiddleware } from "./common/logger.middleware";
import { AuthGuard } from "./auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
