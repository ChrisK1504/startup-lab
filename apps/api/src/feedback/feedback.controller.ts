import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFeedbackDto } from './feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly service: FeedbackService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() dto: CreateFeedbackDto) { return this.service.create(dto); }
  @Patch(':id/status') cycleStatus(@Param('id') id: string) { return this.service.cycleStatus(id); }
}
