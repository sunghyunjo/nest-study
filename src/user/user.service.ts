import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Connection, getManager } from "typeorm";

import { User } from "./user.entity";
export interface UserForm {
  firstName: string;
  lastName: string;
  isActive: boolean;
}

@Injectable()
export class UserService {
  private counter: number = 0;
  public readonly users: UserForm[] = [];
  private manager = getManager();

  constructor(private connection: Connection) {}

  // async getAllUsers(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async createMany(users: User[]) {
    let userObj = users.map(user => new User(user));

    const queryRunner = this.connection.createQueryRunner();
    // connection은 queryRunner를 생성할때만 사용된다.
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(userObj[0]);
      await queryRunner.manager.save(userObj[1]);
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log({ err });
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    /**
     * 방법 2 callback 형태로
     * await this.connection.transaction(async manager => {
     *   await manager.save(users[0]);
     *   await manager.save(users[1]);
     * });
     */

    // @Transaction() 과 @TransactionManager() 는 비추천.
  }

  async findUser(firstName: string, lastName: string) {
    return await this.manager.find(User, { firstName, lastName });
  }
  // public addUser(user: UserForm) {
  //   if (this.findUser(user.name)) {
  //     throw new BadRequestException("이미 사용자가 존재합니다.");
  //   } else {
  //     const createdUser = { ...user, id: this.counter++ };
  //     this.users.push(createdUser);
  //     return createdUser;
  //   }
  // }

  // public removeUser(name: string) {
  //   const index = this.users.findIndex(u => u.name === name);
  //   if (index === -1) {
  //     throw new BadRequestException("사용자가 존재하지 않습니다.");
  //   }
  //   this.users.splice(index, 1);
  //   console.log(this.users);
  // }

  // public editUser(user: Partial<UserForm> & { name: string }) {
  //   const foundUser = this.findUser(user.name);
  //   if (foundUser) {
  //     Object.assign(foundUser, user);
  //   } else {
  //     throw new BadRequestException("사용자가 존재하지 않습니다.");
  //   }
  // }
}
