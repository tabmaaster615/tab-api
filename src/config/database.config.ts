export default () => ({
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true',
  },
});
