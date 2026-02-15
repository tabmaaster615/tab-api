import { DataSource } from 'typeorm';
import { Permission } from '../entities/permission.entity';
export const seedPermission = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Permission);

  //   const permissions = [
  //     { permissionName: 'USER_MANAGEMENT', permissionDesc: 'Manage all users' },
  //     {
  //       permissionName: 'TOURNAMENT_MANAGEMENT',
  //       permissionDesc: 'Manage all tournaments',
  //     },
  //     {
  //       permissionName: 'CREATE_TOURNAMENT',
  //       permissionDesc: 'Create tournaments',
  //     },
  //     { permissionName: 'EDIT_TOURNAMENT', permissionDesc: 'Edit tournaments' },
  //     { permissionName: 'MANAGE_ROUNDS', permissionDesc: 'Manage rounds' },
  //     { permissionName: 'MANAGE_TEAMS', permissionDesc: 'Manage teams' },
  //     { permissionName: 'MANAGE_MATCHES', permissionDesc: 'Manage matches' },
  //     { permissionName: 'MANAGE_SCORES', permissionDesc: 'Manage scores' },
  //     { permissionName: 'MANAGE_DEBATERS', permissionDesc: 'Manage debaters' },
  //     {
  //       permissionName: 'MANAGE_ADJUDICATORS',
  //       permissionDesc: 'Manage adjudicators',
  //     },
  //     { permissionName: 'MANAGE_BREAKS', permissionDesc: 'Manage breaks' },
  //     { permissionName: 'MANAGE_RESULTS', permissionDesc: 'Manage results' },
  //     { permissionName: 'MANAGE_SETTINGS', permissionDesc: 'Manage settings' },
  //     { permissionName: 'MANAGE_VENUES', permissionDesc: 'Manage venues' },
  //     { permissionName: 'MANAGE_ROLES', permissionDesc: 'Manage roles' },
  //     { permissionName: 'VIEW_REPORTS', permissionDesc: 'View reports' },
  //     { permissionName: 'VIEW_DASHBOARD', permissionDesc: 'View dashboard' },
  //   ];

  const permissions = [
    {
      permissionName: 'CREATE_TOURNAMENT',
      permissionDesc: 'Create tournament',
    },
    {
      permissionName: 'EDIT_TOURNAMENT',
      permissionDesc: 'Edit tournament settings',
    },
    {
      permissionName: 'MANAGE_ROUNDS',
      permissionDesc: 'Create and manage rounds',
    },
    {
      permissionName: 'ASSIGN_ADJUDICATORS',
      permissionDesc: 'Assign adjudicators to debates',
    },
    {
      permissionName: 'SUBMIT_BALLOT',
      permissionDesc: 'Submit ballot for debate',
    },
    {
      permissionName: 'VIEW_PUBLIC_STANDINGS',
      permissionDesc: 'View public standings',
    },
  ];

  for (const perm of permissions) {
    const existingPermission = await repo.findOne({
      where: { permissionName: perm.permissionName },
    });
    if (!existingPermission) {
      await repo.save(repo.create(perm));
    }

    console.log(`${perm.permissionName} has been seeded successfully...`);
  }
};
