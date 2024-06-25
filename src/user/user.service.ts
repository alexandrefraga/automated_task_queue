import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [];
  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return this.users;
  }

  findAll() {
    return this.users;
  }
}
