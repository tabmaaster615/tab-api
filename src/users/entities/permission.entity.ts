import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('permissions')
@Unique(['permissionName'])
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'permission_name',
    nullable: false,
    unique: true,
    length: 50,
  })
  permissionName: string;

  @Column({ name: 'permission_desc', nullable: false })
  permissionDesc: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
