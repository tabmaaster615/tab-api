import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('user_tournament_roles')
@Unique(['user', 'role', 'tournamentId'])
export class UserTournamentRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tournamentRoles, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Role, { eager: true, onDelete: 'CASCADE' })
  role: Role;

  // @ManyToOne(() => Tournament, { eager: true, onDelete: 'CASCADE' })
  // tournament: Tournament;

  @Column({ name: 'tournament_id', nullable: true, type: 'varchar' })
  tournamentId: string | null;

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
