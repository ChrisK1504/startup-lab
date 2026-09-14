import { NotFoundException } from '@nestjs/common';
import { Feedback, FeedbackStatus } from './feedback.entity';
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

  it('returns the feedback when it exists', async () => {
    const feedback: Feedback = {
      id: '1',
      title: 'Jest',
      description: 'You jest',
      status: FeedbackStatus.NEW,
      createdAt: new Date,
    };

    repo.findOneBy.mockResolvedValue(feedback)

    await expect(service.findById('1')).resolves.toEqual(feedback);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: '1' })
    expect(repo.findOneBy).toHaveBeenCalledTimes(1);

  })

  it('throws NotFoundException when feedback does not exist', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.findById('missing-id')).rejects.toThrow(new NotFoundException('Feedback not found'));
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 'missing-id' })
    expect(repo.findOneBy).toHaveBeenCalledTimes(1);
  })
});
