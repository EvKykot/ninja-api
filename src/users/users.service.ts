import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 0, name: 'Eugen', email: 'e.kykot@gmail.com', age: 37 },
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: Date.now(),
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((item) => {
      if (item.id !== id) return item;
      return { ...item, ...updateUserDto };
    });

    return this.getUser(id);
  }

  deleteUser(id: number) {
    const toBeRemoved = this.getUser(id);
    this.users = this.users.filter((item) => item.id !== id);

    return toBeRemoved;
  }
}
