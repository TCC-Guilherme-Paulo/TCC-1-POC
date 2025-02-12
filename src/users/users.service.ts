import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(data) {
    return await this.usersRepository.create(data);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }
}
