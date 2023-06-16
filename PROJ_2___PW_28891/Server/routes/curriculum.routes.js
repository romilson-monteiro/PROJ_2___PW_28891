import { Router } from 'express';
import {
  createPersonalInfo,
  createContact,
  createEducation,
  createWorkExperience,
  createLanguage,
  createSkill,
  getAllPersonalInfo,
  getAllContacts,
  getAllEducations,
  getAllWorkExperiences,
  getAllLanguages,
  getAllSkills,
  deletePersonalInfo,
  deleteContact,
  deleteEducation,
  deleteWorkExperience,
  deleteLanguage,
  deleteSkill,
  updatePersonalInfo,
  updateContact,
  updateEducation,
  updateWorkExperience,
  updateLanguage,
  updateSkill,
  getPersonalInfoById,
  getContactById,
  getEducationById,
  getWorkExperienceById,
  getLanguageById,
  getSkillById,
} from '../controllers/curriculum.controller.js';

const curriculumRoutes = Router();

// CRUD operations for personal info
curriculumRoutes.post('/personal-info', createPersonalInfo);
curriculumRoutes.get('/personal-info', getAllPersonalInfo);
curriculumRoutes.get('/personal-info/:id', getPersonalInfoById);
curriculumRoutes.delete('/personal-info/:id', deletePersonalInfo);
curriculumRoutes.put('/personal-info/:id', updatePersonalInfo);

// CRUD operations for contacts
curriculumRoutes.post('/contact', createContact);
curriculumRoutes.get('/contact', getAllContacts);
curriculumRoutes.get('/contact/:id', getContactById);
curriculumRoutes.delete('/contact/:id', deleteContact);
curriculumRoutes.put('/contact/:id', updateContact);

// CRUD operations for education
curriculumRoutes.post('/education', createEducation);
curriculumRoutes.get('/education', getAllEducations);
curriculumRoutes.get('/education/:id', getEducationById);
curriculumRoutes.delete('/education/:id', deleteEducation);
curriculumRoutes.put('/education/:id', updateEducation);

// CRUD operations for work experiences
curriculumRoutes.post('/work-experience', createWorkExperience);
curriculumRoutes.get('/work-experience', getAllWorkExperiences);
curriculumRoutes.get('/work-experience/:id', getWorkExperienceById);
curriculumRoutes.delete('/work-experience/:id', deleteWorkExperience);
curriculumRoutes.put('/work-experience/:id', updateWorkExperience);

// CRUD operations for languages
curriculumRoutes.post('/language', createLanguage);
curriculumRoutes.get('/language', getAllLanguages);
curriculumRoutes.get('/language/:id', getLanguageById);
curriculumRoutes.delete('/language/:id', deleteLanguage);
curriculumRoutes.put('/language/:id', updateLanguage);

// CRUD operations for skills
curriculumRoutes.post('/skill', createSkill);
curriculumRoutes.get('/skill', getAllSkills);
curriculumRoutes.get('/skill/:id', getSkillById);
curriculumRoutes.delete('/skill/:id', deleteSkill);
curriculumRoutes.put('/skill/:id', updateSkill);

export { curriculumRoutes };
