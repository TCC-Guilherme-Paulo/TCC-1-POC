import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { Users, UsersSchema } from './schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Users.name,
    schema: UsersSchema,
  }])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
