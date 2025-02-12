import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Help } from './schemas/help.schema';

@Injectable()
export class HelpRepository {
  constructor(@InjectModel(Help.name) private readonly helpModel: Model<Help>) {}

  async shortList(coords: number[], id: string, isUserEntity: boolean, categoryArray?: string[]): Promise<any[]> {
    const matchQuery: any = {
      active: true,
      ownerId: { $ne: new Types.ObjectId(id) },
      status: 'waiting',
    };

    if (isUserEntity) {
      matchQuery.possibleEntities = { $nin: [new Types.ObjectId(id)] };
    } else {
      matchQuery.possibleHelpers = { $nin: [new Types.ObjectId(id)] };
    }

    if (categoryArray && categoryArray.length > 0) {
      matchQuery.categoryId = {
        $in: categoryArray.map((categoryString) => new Types.ObjectId(categoryString)),
      };
    }

    const helpFields = [
      '_id',
      'title',
      'description',
      'categoryId',
      'ownerId',
      'creationDate',
      'location',
      'index',
    ];

    const userPopulate = {
      path: 'user',
      select: ['name', 'riskGroup', 'location.coordinates'],
    };

    const categoriesPopulate = {
      path: 'categories',
      select: ['_id', 'name'],
    };

    const helps = await this.helpModel
      .find(matchQuery, helpFields)
      .populate([userPopulate, categoriesPopulate])
      .exec();

    const helpsWithDistance = helps.map((help) => {
      help.distances = { userCoords: help.location?.coordinates, coords: coords }

      return help.toObject();
    });

    return helpsWithDistance;
  }
}
