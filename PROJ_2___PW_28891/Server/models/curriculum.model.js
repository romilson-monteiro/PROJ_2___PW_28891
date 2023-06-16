import { INTEGER, STRING } from 'sequelize';
import { curriculumDB } from '../config/context/database.js';

const PersonalInfoModel = curriculumDB.define('personal_info', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  full_name: {
    type: STRING,
    allowNull: false,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  about_me: {
    type: STRING,
    allowNull: false,
  },
});

const ContactModel = curriculumDB.define('contact', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  contact_type: {
    type: STRING,
    allowNull: false,
  },
  contact_info: {
    type: STRING,
    allowNull: false,
  },
});

const EducationModel = curriculumDB.define('education', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  school_name: {
    type: STRING,
    allowNull: false,
  },
  school_year: {
    type: STRING,
    allowNull: false,
  },
  school_description: {
    type: STRING,
    allowNull: false,
  },
});

const WorkExperienceModel = curriculumDB.define('work_experience', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company_name: {
    type: STRING,
    allowNull: false,
  },
  job_title: {
    type: STRING,
    allowNull: false,
  },
  work_duration: {
    type: STRING,
    allowNull: false,
  },
  work_description: {
    type: STRING,
    allowNull: false,
  },
});

const LanguageModel = curriculumDB.define('languages', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  language_name: {
    type: STRING,
    allowNull: false,
  },
  language_level: {
    type: STRING,
    allowNull: false,
  },
});

const SkillModel = curriculumDB.define('skills', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  skill_name: {
    type: STRING,
    allowNull: false,
  },
  skill_level: {
    type: STRING,
    allowNull: false,
  },
});

export {
  PersonalInfoModel,
  ContactModel,
  EducationModel,
  WorkExperienceModel,
  LanguageModel,
  SkillModel,
};
