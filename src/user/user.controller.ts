import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  BadRequestException
} from "@nestjs/common";
import { UserService, UserForm } from "./user.service";
import { User } from "./user.entity";
import { AuthGuard } from "../auth.guard";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  // Service를 Controller의 생성자에서 주입한다.
  public constructor(private readonly service: UserService) {}

  @Get("/list")
  getAllUsers(): Promise<User[]> {
    return this.service.getAllUsers();
  }

  @Get("")
  public getUsers() {
    return this.service.users;
  }

  // @Get("/:name")
  // // @Param 데코레이터는 request url의 param을 method의 parameter로 제공한다.
  // public getUser(@Param() param: { name: string }) {
  //   const ret = this.service.findUser(param.name);
  //   if (ret) {
  //     return ret;
  //   } else {
  //     // NestJS 에서는 기본적인 HTTPException들을 재공한다.
  //     throw new BadRequestException("해당 사용자가 없습니다");
  //   }
  // }

  // @Post("")
  // // @Body 데코레이터는 request의 body data를 method의 parameter로 제공한다.
  // public createUser(@Body() user: UserForm) {
  //   return this.service.addUser(user);
  // }

  @Post("")
  createMany(@Body() user: User[]) {
    return this.service.createMany(user);
  }

  // @Put("")
  // public editUser(@Body() user: UserForm) {
  //   return this.service.editUser(user);
  // }

  // @Delete("/:name")
  // public deleteUser(@Param() param: { name: string }) {
  //   return this.service.removeUser(param.name);
  // }
}
