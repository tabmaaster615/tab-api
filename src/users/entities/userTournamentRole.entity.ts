import {
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

  // null = global role
  // later this becomes ManyToOne(() => Tournament)
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
