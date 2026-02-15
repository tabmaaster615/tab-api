import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserTournamentRole } from './userTournamentRole.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  institution: string;

  @Column({ length: 20, nullable: false })
  phone: string;

  @Index()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ name: 'password_hash', nullable: false, select: false })
  passwordHash: string;

  @Column({ name: 'is_active', nullable: false, default: true })
  isActive: boolean;

  @OneToMany(
    () => UserTournamentRole,
    (userTournamentRole) => userTournamentRole.user,
    {
      cascade: false,
    },
  )
  tournamentRoles: UserTournamentRole[];

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
