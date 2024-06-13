import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('search')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users')
  async searchUsers(@Query() searchDto: SearchDto) {
    return this.searchService.searchUsers(searchDto.query);
  }

  @Get('profiles')
  async searchProfiles(@Query() searchDto: SearchDto) {
    return this.searchService.searchProfiles(searchDto.query);
  }

  @Get('projects')
  async searchProjects(@Query() searchDto: SearchDto) {
    return this.searchService.searchProjects(searchDto.query);
  }

  @Get('messages')
  async searchMessages(@Query() searchDto: SearchDto) {
    return this.searchService.searchMessages(searchDto.query);
  }
}
