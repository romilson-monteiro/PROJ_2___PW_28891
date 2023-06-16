
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (token) {
    document.querySelectorAll("nav.nav ul li").forEach((li) => {
      li.style.display = "none";
    });

    document.getElementById("logout-button").style.display = "block";

    // Mostrar os botões de adição apenas para usuários autenticados
    document.getElementById("add-contact-button").style.display = "block";
    document.getElementById("add-about-me-button").style.display = "block";
    document.getElementById("add-language-button").style.display = "block";
    document.getElementById("add-skill-button").style.display = "block";
    document.getElementById("add-education-button").style.display = "block";
    document.getElementById("add-work-experience-button").style.display =
      "block";
  }
});

function logout() {
  localStorage.removeItem("token-iusabndkjanbksd");
  location.reload();
}

const mainContent = document.querySelector("main");
mainContent.style.opacity = 0;

window.addEventListener("load", () => {
  // Caregar todos os conteodos do servidor
  fetchSkills();
  fetchLanguages();
  fetchEducation();
  fetchWorkExperience();
  fetchPersonalInfo();
  fetchContacts();

  mainContent.style.transition = "opacity 1s ease-in-out";
  mainContent.style.opacity = 1;
});

function toggleAboutMeForm() {
  var form = document.getElementById("about-me-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function clearAboutMeForm() {
  document.getElementById("name-input").value = "";
  document.getElementById("job-input").value = "";
  document.getElementById("about-me-textarea").value = "";
  var aboutMeForm = document.getElementById("about-me-form");
  aboutMeForm.removeAttribute("data-mode");
  aboutMeForm.removeAttribute("data-id");
}

function addAboutMe() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  var name = document.getElementById("name-input").value.trim();
  var job = document.getElementById("job-input").value.trim();
  var aboutMeContent = document.getElementById("about-me-content");
  var aboutMeTextarea = document.getElementById("about-me-textarea");
  var aboutMeText = aboutMeTextarea.value.trim();
  if (!token) {
    return;
  }

  if (name !== "" && job !== "" && aboutMeText !== "") {
    const data = {
      full_name: name,
      title: job,
      about_me: aboutMeText,
    };

    var aboutMeForm = document.getElementById("about-me-form");
    const isEditMode = aboutMeForm.getAttribute("data-mode") === "edit";
    const aboutMeId = aboutMeForm.getAttribute("data-id");
    const url = isEditMode
      ? `http://localhost:4242/api/curriculum/personal-info/${aboutMeId}`
      : "http://localhost:4242/api/curriculum/personal-info";
    const method = isEditMode ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        toggleAboutMeForm();
        fetchPersonalInfo();
        clearAboutMeForm();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function fetchPersonalInfo() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  fetch("http://localhost:4242/api/curriculum/personal-info", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      var aboutMeDiv = document.getElementById("editaboutme");
      aboutMeDiv.innerHTML = "";
      if (result && result.length > 0) {
        const personalInfo = result[0];
        document.getElementById("name").textContent = personalInfo.full_name;
        document.getElementById("job").textContent = personalInfo.title;
        document.getElementById("about-me-content").textContent =
          personalInfo.about_me;
        document.getElementById("add-about-me-button").style.display = "none";
        if (token) {
          // Add the edit and delete buttons
          var editButton = document.createElement("button");
          editButton.className = "edit-button";
          editButton.innerHTML = '<i class="fas fa-edit"></i>';
          editButton.onclick = function () {
            editAboutMe(personalInfo);
          };

          var deleteButton = document.createElement("button");
          deleteButton.className = "delete-button";
          deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
          deleteButton.onclick = function () {
            deleteAboutMe(personalInfo.id);
          };

          aboutMeDiv.appendChild(editButton);
          aboutMeDiv.appendChild(deleteButton);
        }
      } else {
        document.getElementById("name").textContent = "";
        document.getElementById("job").textContent = "";
        document.getElementById("about-me-content").textContent = "";
        document.getElementById("add-about-me-button").style.display = "block";

        // Remove the edit and delete buttons if they exist
        var editButton = document.querySelector(
          "#editaboutme button.edit-button"
        );
        var deleteButton = document.querySelector(
          "#editaboutme button.delete-button"
        );
        if (editButton) {
          aboutMeDiv.removeChild(editButton);
        }
        if (deleteButton) {
          aboutMeDiv.removeChild(deleteButton);
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function editAboutMe(personalInfo) {
  document.getElementById("name-input").value = personalInfo.full_name;
  document.getElementById("job-input").value = personalInfo.title;
  document.getElementById("about-me-textarea").value = personalInfo.about_me;

  // Set the data-mode and data-id attributes on the about me form
  var aboutMeForm = document.getElementById("about-me-form");
  aboutMeForm.setAttribute("data-mode", "edit");
  aboutMeForm.setAttribute("data-id", personalInfo.id);

  toggleAboutMeForm();
}

function deleteAboutMe(id) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/personal-info/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      fetchPersonalInfo();
      // Handle successful deletion
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

// Função para buscar os contatos do servidor
function fetchContacts() {
  const token = localStorage.getItem("token-iusabndkjanbksd");

  fetch("http://localhost:4242/api/curriculum/contact", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // Handle the response or perform any necessary actions
      console.log(result);

      var contactList = document.getElementById("contact-list");
      contactList.innerHTML = "";

      if (result && result.length > 0) {
        result.forEach((contact) => {
          var listItem = document.createElement("li");
          listItem.classList.add("contact-item");
          var iconClass = getIconClass(contact.contact_type);
          var iconElement = document.createElement("i");
          iconElement.className = iconClass;
          iconElement.setAttribute("aria-hidden", "true");

          var linkElement = document.createElement("a");
          linkElement.href = getContactHref(
            contact.contact_type,
            contact.contact_info
          );
          linkElement.target = "_blank";
          linkElement.appendChild(iconElement);
          linkElement.appendChild(
            document.createTextNode(contact.contact_info)
          );
          if (token) {
            var editButton = document.createElement("button");
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.onclick = function () {
              editContact(contact.id);
            };

            var deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.onclick = function () {
              deleteContact(contact.id);
            };
          }
          listItem.appendChild(linkElement);
          if (token) {
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
          }
          contactList.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function saveContact() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  const contactForm = document.getElementById("contact-form");
  const contactTypeElement = document.getElementById("contact-type");
  const contactInfoElement = document.getElementById("contact-info");
  const contactType = contactTypeElement.value;
  const contactInfo = contactInfoElement.value;
  const mode = contactForm.getAttribute("data-mode");
  const id = contactForm.getAttribute("data-id");

  if (contactInfo.trim() === "") {
    return;
  }

  const data = {
    contact_type: contactType,
    contact_info: contactInfo,
  };

  if (mode === "edit") {
    if (!id) {
      return;
    }
    updateContact(id, data);
  } else {
    addContact(data);
  }

  toggleContactForm();
  clearContactForm();
}
function addContact() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  var contactType = document.getElementById("contact-type").value;
  var contactInfo = document.getElementById("contact-info").value;

  if (!token) {
    return;
  }
  if (contactType.trim() === "" || contactInfo.trim() === "") {
    return;
  }

  const data = {
    contact_type: contactType,
    contact_info: contactInfo,
  };

  // Check if the form is in edit mode or add mode
  const isEditMode =
    document.getElementById("contact-form").getAttribute("data-mode") ===
    "edit";
  const contactId = document
    .getElementById("contact-form")
    .getAttribute("data-id");
  const url = isEditMode
    ? `http://localhost:4242/api/curriculum/contact/${contactId}`
    : "http://localhost:4242/api/curriculum/contact";
  const method = isEditMode ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      toggleContactForm();
      fetchContacts();
      clearContactForm();
    })
    .catch((error) => {
      console.error(error);
    });
}

function editContact(contactId) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/contact/${contactId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((contact) => {
      document.getElementById("contact-type").value = contact.contact_type;
      document.getElementById("contact-info").value = contact.contact_info;

      // Set the data-mode and data-id attributes on the contact form
      const contactForm = document.getElementById("contact-form");
      contactForm.setAttribute("data-mode", "edit");
      contactForm.setAttribute("data-id", contactId);

      toggleContactForm();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteContact(id) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/contact/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      fetchContacts();
      // Handle successful deletion
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

//Pegar o tipo de icone de contacto
function getIconClass(contactType) {
  switch (contactType) {
    case "email":
      return "fas fa-envelope";
    case "linkedin":
      return "fab fa-linkedin";
    case "phone":
      return "fas fa-phone";
    case "instagram":
      return "fab fa-instagram";
    case "facebook":
      return "fab fa-facebook";
    default:
      return "fas fa-info-circle";
  }
}

// Função para limpar o formulário de contato após adicionar um contato
function clearContactForm() {
  document.getElementById("contact-info").value = "";
}

// Função para obter o link apropriado com base no tipo de contato
function getContactHref(contactType, contactInfo) {
  switch (contactType) {
    case "email":
      return "mailto:" + contactInfo;
    case "linkedin":
      return "https://www.linkedin.com/in/" + contactInfo;
    case "phone":
      return "tel:" + contactInfo;
    case "instagram":
      return "https://www.instagram.com/" + contactInfo;
    case "facebook":
      return "https://www.facebook.com/" + contactInfo;
    default:
      return "#";
  }
}

// Função para mostrar/ocultar o formulário de contato
function toggleContactForm() {
  var contactForm = document.getElementById("contact-form");
  var addButton = document.getElementById("add-contact-button");

  if (contactForm.style.display === "none") {
    contactForm.style.display = "block";
    addButton.style.display = "none";
  } else {
    contactForm.style.display = "none";
    addButton.style.display = "block";
  }
}

// Função para buscar os ideomas do servidor
function fetchLanguages() {
  fetch("http://localhost:4242/api/curriculum/language", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((languages) => {
      var languagesList = document.getElementById("languages-list");

      languagesList.innerHTML = "";

      languages.forEach((language) => {
        var listItem = document.createElement("li");
        listItem.classList.add("language-item");

        var progressBar = document.createElement("progress");
        progressBar.setAttribute("value", "0");
        progressBar.setAttribute("max", "100");

        var languageDiv = document.createElement("div");

        var languageName = document.createElement("span");
        languageName.textContent = language.language_name;

        const token = localStorage.getItem("token-iusabndkjanbksd");
        if (token) {
          // Create edit button
          var editButton = document.createElement("button");
          var editButton = document.createElement("button");
          editButton.innerHTML = '<i class="fas fa-edit"></i>';
          editButton.onclick = function () {
            editLanguage(language.id);
          };

          // Create delete button
          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
          deleteButton.onclick = function () {
            // Handle delete button click
            deleteLanguage(language.id);
          };
        }
        // Append the language name, edit button, and delete button to the language div
        languageDiv.appendChild(languageName);
        if (token) {
          languageDiv.appendChild(editButton);
          languageDiv.appendChild(deleteButton);
        }
        // Append the progress bar and language div to the list item
        listItem.appendChild(languageDiv);
        listItem.appendChild(progressBar);

        languagesList.appendChild(listItem);

        // Animate the progress bar
        $(progressBar).animate({ value: language.language_level }, 1000);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// Função para adicionar/editar uma linguagem POST/PUT
function addLanguage() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  var languageName = document.getElementById("language-name").value;
  var languageLevel = document.getElementById("language-level").value;

  if (!token) {
    return;
  }
  if (languageName.trim() === "" || Number(languageLevel) <= 0) {
    return;
  }

  var languagesList = document.getElementById("languages-list");
  const data = {
    language_name: languageName,
    language_level: languageLevel,
  };

  // Check if the form is in edit mode or add mode
  const isEditMode =
    document.getElementById("language-form").getAttribute("data-mode") ===
    "edit";
  const languageId = document
    .getElementById("language-form")
    .getAttribute("data-id");
  const url = isEditMode
    ? `http://localhost:4242/api/curriculum/language/${languageId}`
    : "http://localhost:4242/api/curriculum/language";
  const method = isEditMode ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      toggleLanguageForm();
      fetchLanguages(); // Fetch and update the languages list after adding/editing a language
      clearLanguageForm(); // Clear the language form after submission
    })
    .catch((error) => {
      console.error(error);
    });
}

// Função para editar uma linguagem
function editLanguage(languageId) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/language/${languageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((language) => {
      document.getElementById("language-name").value = language.language_name;
      document.getElementById("language-level").value = language.language_level;

      // Set the data-mode and data-id attributes on the language form
      const languageForm = document.getElementById("language-form");
      languageForm.setAttribute("data-mode", "edit");
      languageForm.setAttribute("data-id", languageId);

      toggleLanguageForm();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteLanguage(id) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/language/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      fetchLanguages();
      // Handle successful deletion
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

// Função para limpar o formulário de linguagens
function clearLanguageForm() {
  document.getElementById("language-name").value = "";
  document.getElementById("language-level").value = "";
}

// Função para mostrar ou esconder o formulário de linguagens
function toggleLanguageForm() {
  var languageForm = document.getElementById("language-form");
  var addButton = document.getElementById("add-language-button");

  if (languageForm.style.display === "none") {
    languageForm.style.display = "block";
    addButton.style.display = "none";
  } else {
    languageForm.style.display = "none";
    addButton.style.display = "block";

    clearLanguageForm();
  }
}

// Função para buscar os skills do servidor
function fetchSkills() {
  fetch("http://localhost:4242/api/curriculum/skill", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((skills) => {
      var skillsList = document.getElementById("skills-list");

      skillsList.innerHTML = "";

      // Loop through the skills and create list items with edit and delete buttons
      skills.forEach((skill) => {
        var listItem = document.createElement("li");
        listItem.classList.add("skill-item");

        var progressBar = document.createElement("progress");
        progressBar.setAttribute("value", "0");
        progressBar.setAttribute("max", "100");

        var skillDiv = document.createElement("div");

        // Create a new span element for skill name
        var skillName = document.createElement("span");
        skillName.textContent = skill.skill_name;
        const token = localStorage.getItem("token-iusabndkjanbksd");
        if (token) {
          var editButton = document.createElement("button");
          editButton.innerHTML = '<i class="fas fa-edit"></i>';
          editButton.onclick = function () {
            editSkill(skill.id);
          };

          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
          deleteButton.onclick = function () {
            deleteSkill(skill.id);
          };
        }

        skillDiv.appendChild(skillName);

        if (token) {
          skillDiv.appendChild(editButton);
          skillDiv.appendChild(deleteButton);
        }

        listItem.appendChild(skillDiv);
        listItem.appendChild(progressBar);

        skillsList.appendChild(listItem);

        // Animate the progress bar
        $(progressBar).animate({ value: skill.skill_level }, 1000);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
function addSkill() {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  var skillName = document.getElementById("skill-name").value;
  var skillLevel = document.getElementById("skill-level").value;

  if (!token) {
    return;
  }
  if (skillName.trim() === "" || Number(skillLevel) <= 0) {
    return;
  }

  var skillsList = document.getElementById("skills-list");
  const data = {
    skill_name: skillName,
    skill_level: skillLevel,
  };

  // Check if the form is in edit mode or add mode
  const isEditMode =
    document.getElementById("skill-form").getAttribute("data-mode") === "edit";
  const skillId = document.getElementById("skill-form").getAttribute("data-id");
  const url = isEditMode
    ? `http://localhost:4242/api/curriculum/skill/${skillId}`
    : "http://localhost:4242/api/curriculum/skill";
  const method = isEditMode ? "PUT" : "POST";

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => {
      toggleSkillForm();
      fetchSkills();
      clearSkillForm();
    })
    .catch((error) => {
      console.error(error);
    });
}

function editSkill(skillId) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/skill/${skillId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((skill) => {
      document.getElementById("skill-name").value = skill.skill_name;
      document.getElementById("skill-level").value = skill.skill_level;

      // Set the data-mode and data-id attributes on the skill form
      const skillForm = document.getElementById("skill-form");
      skillForm.setAttribute("data-mode", "edit");
      skillForm.setAttribute("data-id", skillId);

      toggleSkillForm();
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteSkill(id) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/skill/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      fetchSkills();
      // Handle successful deletion
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}
// Função para limpar o formulário de skills
function clearSkillForm() {
  document.getElementById("skill-name").value = "";
  document.getElementById("skill-level").value = "";
}

// Função para mostrar ou esconder o formulário de skills
function toggleSkillForm() {
  var skillForm = document.getElementById("skill-form");
  var addButton = document.getElementById("add-skill-button");

  if (skillForm.style.display === "none") {
    skillForm.style.display = "block";
    addButton.style.display = "none";
  } else {
    skillForm.style.display = "none";
    addButton.style.display = "block";

    clearSkillForm();
  }
}

// Função para buscar os education do servidor
function fetchEducation() {
  fetch("http://localhost:4242/api/curriculum/education/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((education) => {
      // Handle the response or perform any necessary actions
      console.log(education);

      var educationList = document.getElementById("education-list");

      // Clear existing education items
      educationList.innerHTML = "";

      // Loop through the education data and create list items
      education.forEach((item) => {
        // Create a new list item
        var listItem = document.createElement("li");
        listItem.classList.add("education-item");

        // Create a new span element for school name and year
        var schoolSpan = document.createElement("span");
        schoolSpan.innerHTML =
          "<strong>" +
          item.school_name +
          " -  (" +
          item.school_year +
          ")" +
          "</strong>";

        var descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent = item.school_description;
        const token = localStorage.getItem("token-iusabndkjanbksd");
        if (token) {
          // Create edit button
          var editButton = document.createElement("button");
          editButton.innerHTML = '<i class="fas fa-edit"></i>';
          editButton.onclick = function () {
            editEducation(item.id);
          };

          // Create delete button
          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
          deleteButton.onclick = function () {
            deleteEducation(item.id);
          };
        }

        listItem.appendChild(schoolSpan);
        if (token) {
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
        }

        listItem.appendChild(descriptionParagraph);

        educationList.appendChild(listItem);
      });
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

function addEducation() {
  var schoolName = document.getElementById("school-name").value;
  var schoolYear = document.getElementById("school-year").value;
  var schoolDescription = document.getElementById("school-description").value;

  if (
    schoolName.trim() === "" ||
    schoolYear.trim() === "" ||
    schoolDescription.trim() === ""
  ) {
    return;
  }

  const data = {
    school_name: schoolName,
    school_year: schoolYear,
    school_description: schoolDescription,
  };

  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  // Check if education form is in edit mode
  const educationForm = document.getElementById("education-form");
  const isEditMode =
    educationForm.getAttribute("education-data-mode") === "edit";

  if (isEditMode) {
    // Edit existing education
    const educationId = educationForm.getAttribute("data-id");
    fetch(`http://localhost:4242/api/curriculum/education/${educationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response
        console.log(result);

        fetchEducation();
        clearEducationForm();
        toggleEducationForm();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  } else {
    // Add new education
    fetch("http://localhost:4242/api/curriculum/education/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response
        console.log(result);

        fetchEducation();
        clearEducationForm();
        toggleEducationForm();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
}

function editEducation(educationId) {
  toggleEducationForm();
  fetch(`http://localhost:4242/api/curriculum/education/${educationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((education) => {
      document.getElementById("school-name").value = education.school_name;
      document.getElementById("school-year").value = education.school_year;
      document.getElementById("school-description").value =
        education.school_description;

      // Set the data-mode and data-id attributes on the education form
      const educationForm = document.getElementById("education-form");
      educationForm.setAttribute("education-data-mode", "edit");
      educationForm.setAttribute("data-id", educationId);
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteEducation(id) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/education/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      fetchEducation();
      // Handle successful deletion
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

function toggleEducationForm() {
  clearEducationForm();
  var educationForm = document.getElementById("education-form");
  var addButton = document.getElementById("add-education-button");

  if (educationForm.style.display === "none") {
    educationForm.style.display = "block";
    addButton.style.display = "none";
  } else {
    educationForm.style.display = "none";
    addButton.style.display = "block";
  }
}

function clearEducationForm() {
  document.getElementById("school-name").value = "";
  document.getElementById("school-year").value = "";
  document.getElementById("school-description").value = "";

  // Reset the data-mode and data-id attributes on the education form
  const educationForm = document.getElementById("education-form");
  educationForm.setAttribute("education-data-mode", "");
  educationForm.setAttribute("data-id", "");
}

// Função para buscar o  workexperince do servidor
function fetchWorkExperience() {
  fetch("http://localhost:4242/api/curriculum/work-experience", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((workExperience) => {
      console.log(workExperience);

      var workExperienceList = document.getElementById("work-experience-list");

      workExperienceList.innerHTML = "";

      workExperience.forEach((item) => {
        var listItem = document.createElement("li");
        listItem.classList.add("workexperience-item");

        var workSpan = document.createElement("span");
        workSpan.innerHTML =
          "<strong>" +
          item.company_name +
          " - " +
          item.job_title +
          "</strong>" +
          " (" +
          item.work_duration +
          ")";

        var descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent = item.work_description;

        const token = localStorage.getItem("token-iusabndkjanbksd");
        if (token) {
          // Create edit button
          var editButton = document.createElement("button");
          editButton.innerHTML = '<i class="fas fa-edit"></i>';
          editButton.onclick = function () {
            editWorkExperience(item.id);
          };

          // Create delete button
          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
          deleteButton.onclick = function () {
            deleteWorkExperience(item.id);
          };

          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
        }

        listItem.appendChild(workSpan);
        if (token) {
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
        }
        listItem.appendChild(descriptionParagraph);

        workExperienceList.appendChild(listItem);
      });
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

// Function to add work experience
function addWorkExperience() {
  var companyName = document.getElementById("company-name").value;
  var jobTitle = document.getElementById("job-title").value;
  var workDuration = document.getElementById("work-duration").value;
  var workDescription = document.getElementById("work-description").value;
  const token = localStorage.getItem("token-iusabndkjanbksd");

  if (!token) {
    return;
  } else if (
    companyName.trim() === "" ||
    jobTitle.trim() === "" ||
    workDuration.trim() === "" ||
    workDescription.trim() === ""
  ) {
    return;
  }

  const data = {
    company_name: companyName,
    job_title: jobTitle,
    work_duration: workDuration,
    work_description: workDescription,
  };

  // Check if workExperience form is in edit mode
  const workExperienceForm = document.getElementById("work-experience-form");
  const isEditMode =
    workExperienceForm.getAttribute("workExperience-data-mode") === "edit";

  if (isEditMode) {
    // Edit existing workExperience
    const workExperienceId = workExperienceForm.getAttribute("data-id");
    fetch(
      `http://localhost:4242/api/curriculum/work-experience/${workExperienceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result); // Handle the response or perform any necessary actions

        fetchWorkExperience();
        clearWorkExperienceForm();
        toggleWorkExperienceForm();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  } else {
    // Add new workExperience
    fetch("http://localhost:4242/api/curriculum/work-experience/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result); // Handle the response or perform any necessary actions

        fetchWorkExperience();
        clearWorkExperienceForm();
        toggleWorkExperienceForm();
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }
}

function editWorkExperience(workExperienceId) {
  toggleWorkExperienceForm();
  fetch(
    `http://localhost:4242/api/curriculum/work-experience/${workExperienceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((workExperience) => {
      document.getElementById("company-name").value =
        workExperience.company_name;
      document.getElementById("job-title").value = workExperience.job_title;
      document.getElementById("work-duration").value =
        workExperience.work_duration;
      document.getElementById("work-description").value =
        workExperience.work_description;

      // Set the data-mode and data-id attributes on the workExperience form
      const workExperienceForm = document.getElementById(
        "work-experience-form"
      );
      workExperienceForm.setAttribute("workExperience-data-mode", "edit");
      workExperienceForm.setAttribute("data-id", workExperienceId);
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteWorkExperience(id) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/curriculum/work-experience/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      fetchWorkExperience();
      // Handle successful deletion
      console.log(result);
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}

function clearWorkExperienceForm() {
  document.getElementById("company-name").value = "";
  document.getElementById("job-title").value = "";
  document.getElementById("work-duration").value = "";
  document.getElementById("work-description").value = "";
}

function toggleWorkExperienceForm() {
  const workExperienceForm = document.getElementById("work-experience-form");
  workExperienceForm.removeAttribute("workExperience-data-mode");
  workExperienceForm.removeAttribute("data-id");

  var addButton = document.getElementById("add-work-experience-button");

  if (workExperienceForm.style.display === "none") {
    workExperienceForm.style.display = "block";
    addButton.style.display = "none";
  } else {
    workExperienceForm.style.display = "none";
    addButton.style.display = "block";
  }
}
