var shell = require('shelljs');

const testSetup = () => {
  shell.exec('npx sequelize db:create')
  shell.exec('npx sequelize db:migrate')
  shell.exec('npx sequelize db:seed:all')
}

const tearDown = () => {
  shell.exec('npx sequelize db:seed:undo:all')
  shell.exec('npx sequelize db:migrate:undo:all')
}

module.exports = {
  testSetup, tearDown
}
