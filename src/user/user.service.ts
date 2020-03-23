import { Injectable, BadRequestException } from '@nestjs/common';

export interface UserForm {
  name: string;
  desc: string;
  email: string;
}

@Injectable()
export class UserService {
  private counter: number = 0;
  public readonly users: UserForm[] = [];
  public findUser(name: string) {
    return this.users.find(u => u.name === name);
  }
  public addUser(user: UserForm) {
    if (this.findUser(user.name)) {
      throw new BadRequestException('이미 사용자가 존재합니다.');
    } else {
      const createdUser = { ...user, id: this.counter++ };
      this.users.push(createdUser);
      return createdUser;
    }
  }

  public removeUser(name: string) {
    const index = this.users.findIndex(u => u.name === name);
    if (index === -1) {
      throw new BadRequestException('사용자가 존재하지 않습니다.');
    }
    this.users.splice(index, 1);
    console.log(this.users);
  }

  public editUser(user: Partial<UserForm> & { name: string }) {
    const foundUser = this.findUser(user.name);
    if (foundUser) {
      Object.assign(foundUser, user);
    } else {
      throw new BadRequestException('사용자가 존재하지 않습니다.');
    }
  }
}
