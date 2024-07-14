import { Controller, Get, Res } from '@nestjs/common';
import { StatusService } from './status.service';
import { Response } from 'express';
import { join } from 'path';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  getStatusPage(@Res() res: Response) {
    res.sendFile(
      join(__dirname, '..', '..', 'modules', 'status', 'public', 'status.html'),
    );
  }

  @Get('api')
  async getStatus() {
    return this.statusService.getStatus();
  }
}
