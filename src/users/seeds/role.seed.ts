import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { permission } from 'process';

export const seedRoles = async (dataSource: DataSource) => {
  const roleRepo = dataSource.getRepository(Role);
  const permissionRepo = dataSource.getRepository(Permission);

  const allPermissions = await permissionRepo.find();

  const getPermissions = (naems: string[]) =>
    allPermissions.filter((perm) => naems.includes(perm.permissionName));

  //   const roles = [
  //     {
  //       roleName: 'ADMIN',
  //       roleDesc: 'Full access to all features',
  //       permissions: allPermissions,
  //     },
  //     {
  //       roleName: 'TOURNAMENT_ADMIN',
  //       roleDesc: 'Manage tournaments',
  //       permissions: allPermissions.filter((perm) =>
  //         perm.permissionName.startsWith('TOURNAMENT_'),
  //       ),
  //     },
  //     {
  //       roleName: 'DEBATER',
  //       roleDesc: 'Participate in tournaments',
  //       permissions: allPermissions.filter((perm) =>
  //         perm.permissionName.startsWith('DEBATER_'),
  //       ),
  //     },
  //     {
  //       roleName: 'ADJUDICATOR',
  //       roleDesc: 'Judge debates',
  //       permissions: allPermissions.filter((perm) =>
  //         perm.permissionName.startsWith('ADJUDICATOR_'),
  //       ),
  //     },
  //   ];

  const roles = [
    {
      name: 'SUPER_ADMIN',
      permissions: allPermissions,
    },
    {
      name: 'TOURNAMENT_ADMIN',
      permissions: getPermissions([
        'CREATE_TOURNAMENT',
        'EDIT_TOURNAMENT',
        'MANAGE_ROUNDS',
      ]),
    },
    {
      name: 'TAB_DIRECTOR',
      permissions: getPermissions(['MANAGE_ROUNDS', 'ASSIGN_ADJUDICATORS']),
    },
    {
      name: 'ADJUDICATOR',
      permissions: getPermissions(['SUBMIT_BALLOT']),
    },
    {
      name: 'SPEAKER',
      permissions: getPermissions(['VIEW_PUBLIC_STANDINGS']),
    },
  ];

  for (const roleData of roles) {
    let role = await roleRepo.findOne({
      where: {
        name: roleData.name,
      },
    });

    if (!role) {
      role = roleRepo.create({
        name: roleData.name,
        permissions: roleData.permissions,
      });
      await roleRepo.save(role);
    }
    console.log(`${roleData.name} has been seeded successfully...`);
  }

  console.log('Roles seeded successfully...');
};
