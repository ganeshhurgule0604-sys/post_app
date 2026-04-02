import { Column } from 'typeorm';

export class BaseEntity {
  @Column({ type: 'integer', name: 'created_by', nullable: true })
  createdBy: number;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'integer', name: 'updated_by', nullable: true })
  updatedBy: number;

  @Column({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: number;

  @Column({ type: 'integer', name: 'deleted_by', nullable: true })
  deletedBy: number;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: number;
}
