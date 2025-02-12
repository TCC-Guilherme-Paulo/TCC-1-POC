import { Injectable } from '@nestjs/common';
import { HelpRepository } from '../help/help.repository';
import { sortActivitiesByDistance } from '../utils/sortActivitiesByDistance';

@Injectable()
export class ActivitiesService {
  constructor(private readonly helpRepository: HelpRepository) {}

  async fetchActivityList(
    coords: number[],
    id: string,
    isUserEntity: boolean,
    categoryArray?: string[],
    activitiesArray?: string[],
  ): Promise<object[]> {
    const promises:Promise<object[]>[] = [];

    const mappedActivitiesRepositories = {
      help: () => this.helpRepository.shortList(coords, id, isUserEntity, categoryArray),
    };

    activitiesArray?.forEach((activity) => {
      if (mappedActivitiesRepositories[activity]) {
        promises.push(mappedActivitiesRepositories[activity]());
      }
    });

    if (!promises.length) {
      promises.push(mappedActivitiesRepositories.help());
    }

    const activitiesList = await Promise.all(promises);

    const flattedList = activitiesList.flat(2);

    return sortActivitiesByDistance({ helpList: flattedList });
  }
}
