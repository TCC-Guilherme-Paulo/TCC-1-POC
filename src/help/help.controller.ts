import { Controller } from '@nestjs/common';
import { HelpService } from './help.service';

@Controller('helps')
export class HelpController {
  constructor(private readonly HelpService: HelpService) {}
}
