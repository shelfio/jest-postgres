const cwd = require('cwd');

module.exports = {
  seedPath: `${cwd()}/test/seed.sql`,
  port: 5555,
  debugMode: true,
};
