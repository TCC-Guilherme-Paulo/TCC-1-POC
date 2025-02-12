import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpService } from './help.service';
import { HelpController } from './help.controller';
import { HelpRepository } from './help.repository';
import { Help, HelpSchema } from './schemas/help.schema';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';
import { UsersModule } from 'src/users/users.module';
import { Categories, CategoriesSchema } from 'src/categories/schemas/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Help.name, schema: HelpSchema },
      { name: Users.name, schema: UsersSchema },
      { name: Categories.name, schema: CategoriesSchema },
    ]),
    UsersModule,
  ],
  controllers: [HelpController],
  providers: [HelpService, HelpRepository],
  exports: [HelpRepository]
})
export class HelpsModule {}
