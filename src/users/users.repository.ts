import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users.name) private readonly model: Model<Users>) {}

  async create(data) {
    return new this.model(data).save();
  }

  async findAll() {
    return this.model.find().exec();
  }
}
