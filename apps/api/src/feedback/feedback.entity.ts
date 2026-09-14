import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum FeedbackStatus { NEW = 'new', PLANNED = 'planned', DONE = 'done' }

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) title!: string;
  @Column({ type: 'text' }) description!: string;
  @Column({ type: 'enum', enum: FeedbackStatus, default: FeedbackStatus.NEW }) status!: FeedbackStatus;
  @CreateDateColumn() createdAt!: Date;
}
