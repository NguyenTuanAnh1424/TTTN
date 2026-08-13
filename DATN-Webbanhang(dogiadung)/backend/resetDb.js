const { sequelize } = require('./src/models');
const seedDatabase = require('./src/seeders/seedData');

async function reset() {
  try {
    console.log('Dropping all tables...');
    await sequelize.drop();
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Seeding data...');
    await seedDatabase();
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

reset();
