import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './feedback.dto';
import { Feedback, FeedbackStatus } from './feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(@InjectRepository(Feedback) private readonly repo: Repository<Feedback>) { }
  
  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: string) { 
    const feedback = await this.repo.findOneBy({ id });
    if (!feedback) throw new NotFoundException("Feedback not found");
    return feedback;
  }

  create(dto: CreateFeedbackDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async cycleStatus(id: string) {
    const item = await this.repo.findOneBy({ id });
    if (!item) throw new NotFoundException('Feedback not found');
    const order = [FeedbackStatus.NEW, FeedbackStatus.PLANNED, FeedbackStatus.DONE];
    item.status = order[(order.indexOf(item.status) + 1) % order.length];
    return this.repo.save(item);
  }
}
