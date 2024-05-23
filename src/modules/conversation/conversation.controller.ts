import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('conversations')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @Roles('user', 'admin')
  async create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  @Roles('user', 'admin')
  async findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  @Roles('user', 'admin')
  async findOne(@Param('id') id: number) {
    return this.conversationService.findOne(id);
  }

  @Put(':id')
  @Roles('user', 'admin')
  async update(
    @Param('id') id: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(id, updateConversationDto);
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return this.conversationService.remove(id);
  }
}
