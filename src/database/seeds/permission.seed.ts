import { DataSource } from 'typeorm';
import { Permission } from '../../users/entities/permission.entity';
export const seedPermissions = async (dataSource: DataSource) => {
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
      permissionName: 'VIEW_BALLOT',
      permissionDesc: 'View ballot for debate',
    },
    {
      permissionName: 'VIEW_TEAM_STANDINGS',
      permissionDesc: 'View team standings',
    },
    {
      permissionName: 'VIEW_DEBATER_STANDINGS',
      permissionDesc: 'View debater standings',
    },
    {
      permissionName: 'VIEW_ADJUDICATOR_STANDINGS',
      permissionDesc: 'View adjudicator standings',
    },
    {
      permissionName: 'VIEW_BREAKS',
      permissionDesc: 'View breaks',
    },
    {
      permissionName: 'VIEW_RESULTS',
      permissionDesc: 'View results',
    },
    {
      permissionName: 'VIEW_DASHBOARD',
      permissionDesc: 'View dashboard',
    },
    {
      permissionName: 'VIEW_PUBLIC_STANDINGS',
      permissionDesc: 'View public standings',
    },
    {
      permissionName: 'VIEW_ALL_BALLOTS',
      permissionDesc: 'View all ballots',
    },
    {
      permissionName: 'VIEW_ALL_TEAMS',
      permissionDesc: 'View all teams',
    },
    {
      permissionName: 'VIEW_ALL_DEBATERS',
      permissionDesc: 'View all debaters',
    },
    {
      permissionName: 'VIEW_ALL_ADJUDICATORS',
      permissionDesc: 'View all adjudicators',
    },
    {
      permissionName: 'VIEW_ALL_BREAKS',
      permissionDesc: 'View all breaks',
    },
    {
      permissionName: 'VIEW_ALL_RESULTS',
      permissionDesc: 'View all results',
    },
    {
      permissionName: 'VIEW_ALL_DASHBOARD',
      permissionDesc: 'View all dashboard',
    },
    {
      permissionName: 'VIEW_ALL_PUBLIC_STANDINGS',
      permissionDesc: 'View all public standings',
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
