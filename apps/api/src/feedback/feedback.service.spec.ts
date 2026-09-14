import { NotFoundException } from '@nestjs/common';
import { FeedbackStatus } from './feedback.entity';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  const repo = { findOneBy: jest.fn(), save: jest.fn(), find: jest.fn(), create: jest.fn() };
  const service = new FeedbackService(repo as never);
  beforeEach(() => jest.clearAllMocks());

  it('cycles a new item to planned', async () => {
    repo.findOneBy.mockResolvedValue({ id: '1', status: FeedbackStatus.NEW });
    repo.save.mockImplementation(async (value) => value);
    await expect(service.cycleStatus('1')).resolves.toMatchObject({ status: FeedbackStatus.PLANNED });
  });

  it('rejects an unknown item', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.cycleStatus('missing')).rejects.toBeInstanceOf(NotFoundException);
  });
});
