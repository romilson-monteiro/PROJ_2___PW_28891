import {
  PersonalInfoModel,
  ContactModel,
  EducationModel,
  WorkExperienceModel,
  LanguageModel,
  SkillModel,
} from '../models/curriculum.model.js';

export const createPersonalInfo = async (req, res) => {
  try {
    const { full_name, title, about_me } = req.body;
    const personalInfo = await PersonalInfoModel.create({
      full_name,
      title,
      about_me,
    });
    return res.json(personalInfo);
  } catch (error) {
    console.error('Error creating personal info:', error);
    return res.status(500).json({ message: 'Failed to create personal info' });
  }
};

export const createContact = async (req, res) => {
  try {
    const { contact_type, contact_info } = req.body;
    const contact = await ContactModel.create({
      contact_type,
      contact_info,
    });
    return res.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return res.status(500).json({ message: 'Failed to create contact' });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { school_name, school_year, school_description } = req.body;
    const education = await EducationModel.create({
      school_name,
      school_year,
      school_description,
    });
    return res.json(education);
  } catch (error) {
    console.error('Error creating education:', error);
    return res.status(500).json({ message: 'Failed to create education' });
  }
};

export const createWorkExperience = async (req, res) => {
  try {
    const { company_name, job_title, work_duration, work_description } =
      req.body;
    const workExperience = await WorkExperienceModel.create({
      company_name,
      job_title,
      work_duration,
      work_description,
    });
    return res.json(workExperience);
  } catch (error) {
    console.error('Error creating work experience:', error);
    return res
      .status(500)
      .json({ message: 'Failed to create work experience' });
  }
};

export const createLanguage = async (req, res) => {
  try {
    const { language_name, language_level } = req.body;
    const language = await LanguageModel.create({
      language_name,
      language_level,
    });
    return res.json(language);
  } catch (error) {
    console.error('Error creating language:', error);
    return res.status(500).json({ message: 'Failed to create language' });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { skill_name, skill_level } = req.body;
    const skill = await SkillModel.create({
      skill_name,
      skill_level,
    });
    return res.json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    return res.status(500).json({ message: 'Failed to create skill' });
  }
};

export const getAllPersonalInfo = async (req, res) => {
  try {
    const personalInfos = await PersonalInfoModel.findAll();
    return res.json(personalInfos);
  } catch (error) {
    console.error('Error retrieving personal info:', error);
    return res.status(500)
      .json({ message: 'Failed to retrieve personal info' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.findAll();
    return res.json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return res.status(500).json({ message: 'Failed to retrieve contacts' });
  }
};

export const getAllEducations = async (req, res) => {
  try {
    const educations = await EducationModel.findAll();
    return res.json(educations);
  } catch (error) {
    console.error('Error retrieving educations:', error);
    return res.status(500).json({ message: 'Failed to retrieve educations' });
  }
};

export const getAllWorkExperiences = async (req, res) => {
  try {
    const workExperiences = await WorkExperienceModel.findAll();
    return res.json(workExperiences);
  } catch (error) {
    console.error('Error retrieving work experiences:', error);
    return res
      .status(500)
      .json({ message: 'Failed to retrieve work experiences' });
  }
};

export const getAllLanguages = async (req, res) => {
  try {
    const languages = await LanguageModel.findAll();
    return res.json(languages);
  } catch (error) {
    console.error('Error retrieving languages:', error);
    return res.status(500).json({ message: 'Failed to retrieve languages' });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await SkillModel.findAll();
    return res.json(skills);
  } catch (error) {
    console.error('Error retrieving skills:', error);
    return res.status(500).json({ message: 'Failed to retrieve skills' });
  }
};

export const deletePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await PersonalInfoModel.destroy({ where: { id } });
    return res.json({ message: 'Personal info deleted successfully' });
  } catch (error) {
    console.error('Error deleting personal info:', error);
    return res.status(500).json({ message: 'Failed to delete personal info' });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await ContactModel.destroy({ where: { id } });
    return res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const id  = req.params.id;
    await EducationModel.destroy({ where: { id } });
    return res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return res.status(500).json({ message: 'Failed to delete education' });
  }
};

export const deleteWorkExperience = async (req, res) => {
  try {
    const { id } = req.params;
    await WorkExperienceModel.destroy({ where: { id } });
    return res.json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting work experience:', error);
    return res
      .status(500)
      .json({ message: 'Failed to delete work experience' });
  }
};

export const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    await LanguageModel.destroy({ where: { id } });
    return res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error('Error deleting language:', error);
    return res.status(500).json({ message: 'Failed to delete language' });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    await SkillModel.destroy({ where: { id } });
    return res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return res.status(500).json({ message: 'Failed to delete skill' });
  }
};

export const updatePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, title, about_me } = req.body;
    await PersonalInfoModel.update(
      { full_name, title, about_me },
      { where: { id } }
    );
    return res.json({ message: 'Personal info updated successfully' });
  } catch (error) {
    console.error('Error updating personal info:', error);
    return res.status(500).json({ message: 'Failed to update personal info' });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { contact_type, contact_info } = req.body;
    await ContactModel.update(
      { contact_type, contact_info },
      { where: { id } }
    );
    return res.json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ message: 'Failed to update contact' });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { school_name, school_year, school_description } = req.body;
    await EducationModel.update(
      { school_name, school_year, school_description },
      { where: { id } }
    );
    return res.json({ message: 'Education updated successfully' });
  } catch (error) {
    console.error('Error updating education:', error);
    return res.status(500).json({ message: 'Failed to update education' });
  }
};

export const updateWorkExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, job_title, work_duration, work_description } =
      req.body;
    await WorkExperienceModel.update(
      { company_name, job_title, work_duration, work_description },
      { where: { id } }
    );
    return res.json({ message: 'Work experience updated successfully' });
  } catch (error) {
    console.error('Error updating work experience:', error);
    return res
      .status(500)
      .json({ message: 'Failed to update work experience' });
  }
};

export const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { language_name, language_level } = req.body;
    await LanguageModel.update(
      { language_name, language_level },
      { where: { id } }
    );
    return res.json({ message: 'Language updated successfully' });
  } catch (error) {
    console.error('Error updating language:', error);
    return res.status(500).json({ message: 'Failed to update language' });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill_name, skill_level } = req.body;
    await SkillModel.update({ skill_name, skill_level }, { where: { id } });
    return res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({ message: 'Failed to update skill' });
  }
};


export const getPersonalInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const personalInfo = await PersonalInfoModel.findByPk(id);
    if (!personalInfo) {
      return res.status(404).json({ message: 'Personal info not found' });
    }
    return res.json(personalInfo);
  } catch (error) {
    console.error('Error retrieving personal info:', error);
    return res
      .status(500)
      .json({ message: 'Failed to retrieve personal info' });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await ContactModel.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    return res.json(contact);
  } catch (error) {
    console.error('Error retrieving contact:', error);
    return res.status(500).json({ message: 'Failed to retrieve contact' });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;
    const education = await EducationModel.findByPk(id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    return res.json(education);
  } catch (error) {
    console.error('Error retrieving education:', error);
    return res.status(500).json({ message: 'Failed to retrieve education' });
  }
};

export const getWorkExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const workExperience = await WorkExperienceModel.findByPk(id);
    if (!workExperience) {
      return res.status(404).json({ message: 'Work experience not found' });
    }
    return res.json(workExperience);
  } catch (error) {
    console.error('Error retrieving work experience:', error);
    return res
      .status(500)
      .json({ message: 'Failed to retrieve work experience' });
  }
};

export const getLanguageById = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await LanguageModel.findByPk(id);
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }
    return res.json(language);
  } catch (error) {
    console.error('Error retrieving language:', error);
    return res.status(500).json({ message: 'Failed to retrieve language' });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await SkillModel.findByPk(id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    return res.json(skill);
  } catch (error) {
    console.error('Error retrieving skill:', error);
    return res.status(500).json({ message: 'Failed to retrieve skill' });
  }
};
