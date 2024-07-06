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
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { EntityType } from 'src/common/decorators/entity-type.decorator';

@Controller('conversations')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe())
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @Roles('Utilisateur', 'Administrateur')
  async create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  @Roles('Utilisateur', 'Administrateur')
  async findAll() {
    return this.conversationService.findAll();
  }

  @Get(':id')
  @Roles('Utilisateur', 'Administrateur')
  async findOne(@Param('id') id: number) {
    return this.conversationService.findOne(id);
  }

  @Put(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Conversation')
  @Roles('Utilisateur', 'Administrateur')
  async update(
    @Param('id') id: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(id, updateConversationDto);
  }

  @Delete(':id')
  @UseGuards(CreatorGuard)
  @EntityType('Conversation')
  @Roles('Administrateur', 'Utilisateur')
  async remove(@Param('id') id: number) {
    return this.conversationService.remove(id);
  }

  @Get('participants/:id')
  @EntityType('Conversation')
  @Roles('Utilisateur', 'Administrateur')
  async getConversationByParticipantsId(@Param('id') id: number) {
    return this.conversationService.getConversationByParticipantsId(id);
  }
}
