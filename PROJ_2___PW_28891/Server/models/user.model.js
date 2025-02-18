import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';
const UserModel = database.define(
  'user',
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: true,
    },
  }
);
export { UserModel };
