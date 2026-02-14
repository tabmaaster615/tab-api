import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  institution: string;

  @Column({ length: 11, nullable: false })
  phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ name: 'password_hash', nullable: false })
  passwordHash: string;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @Column()
  tournmentRoles: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
