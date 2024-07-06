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
  Patch,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('messages')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @Roles('Utilisateur', 'Administateur')
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @Roles('Utilisateur', 'Administateur')
  async findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Message')
  @Roles('Utilisateur', 'Administateur')
  async findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Message')
  @Roles('Utilisateur', 'Administateur')
  async update(
    @Param('id') id: number,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Message')
  @Roles('Utilisateur', 'Administateur')
  async remove(@Param('id') id: number) {
    return this.messageService.remove(id);
  }

  @Patch('read/:id')
  @UseGuards(CreatorGuard)
  @EntityType('Message')
  @Roles('Utilisateur', 'Administateur')
  async read(@Param('id') id: number) {
    return this.messageService.read(id);
  }

  @Get('conversation/:id')
  @Roles('Utilisateur', 'Administateur')
  async getAllMessageByConversationId(@Param('id') id: number) {
    return this.messageService.getAllMessageByConversationId(id);
  }
}
