import dataSource from '../../../ormconfig';
import { seedPermissions } from './permission.seed';
import { seedRoles } from './role.seed';

const runSeed = async () => {
  await dataSource.initialize();

  await seedPermissions(dataSource);
  await seedRoles(dataSource);

  await dataSource.destroy();

  console.log('Seeding completed');
};

runSeed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
