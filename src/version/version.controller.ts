import { Controller, Get } from '@nestjs/common';

@Controller('version')
export class VersionController {
  @Get('current')
  public version() {
    return 'current version : 1.0';
  }
}
