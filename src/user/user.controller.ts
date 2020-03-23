import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  BadRequestException
} from '@nestjs/common';
import { UserService, UserForm } from './user.service';

@Controller('user')
export class UserController {
  // Service를 Controller의 생성자에서 주입한다.
  public constructor(private readonly service: UserService) {}

  @Get('')
  public getUsers() {
    return this.service.users;
  }

  @Get('/:name')
  // @Param 데코레이터는 request url의 param을 method의 parameter로 제공한다.
  public getUser(@Param() param: { name: string }) {
    const ret = this.service.findUser(param.name);
    if (ret) {
      return ret;
    } else {
      // NestJS 에서는 기본적인 HTTPException들을 재공한다.
      throw new BadRequestException('해당 사용자가 없습니다');
    }
  }

  @Post('')
  // @Body 데코레이터는 request의 body data를 method의 parameter로 제공한다.
  public createUser(@Body() user: UserForm) {
    return this.service.addUser(user);
  }

  @Put('')
  public editUser(@Body() user: UserForm) {
    return this.service.editUser(user);
  }

  @Delete('/:name')
  public deleteUser(@Param() param: { name: string }) {
    return this.service.removeUser(param.name);
  }
}
