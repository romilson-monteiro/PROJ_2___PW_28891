import Sequelize from 'sequelize';

const database = new Sequelize('pw', 'user', 'user', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

const curriculumDB = new Sequelize('curiculunDB', 'user', 'user', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql', 
});

export { database, curriculumDB };
