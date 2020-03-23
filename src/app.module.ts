import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VersionModule } from './version/version.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [VersionModule, UserModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
