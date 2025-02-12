import { Injectable } from '@nestjs/common';
import { HelpRepository } from './help.repository';

@Injectable()
export class HelpService {
  constructor(private readonly HelpsRepository: HelpRepository) {}
}
