const projects = [
  {
    id: "agri-yield",
    category: "ai",
    categoryLabel: "AI / MACHINE LEARNING",
    year: "2025",
    title: "AgriYield 2025",
    subtitle: "Maize Yield Prediction",
    summary: "Predicting maize yield based on agricultural data.",
    description:
      "This project explores agricultural data to build a maize yield prediction model. The workflow focuses on data preprocessing, feature selection, and testing machine learning models to support seasonal analysis.",
    tags: ["Python", "Machine Learning", "Data Science"]
  },
  {
    id: "fake-job",
    category: "ai",
    categoryLabel: "AI / MACHINE LEARNING",
    year: "PROJECT",
    title: "Fake Job Posting Prediction",
    subtitle: "Classifying fraudulent job posts",
    summary: "Combining DistilBERT and Gradient Boosting to detect suspicious job listings.",
    description:
      "The task involves classifying real versus fake job postings by combining text features with structured metadata. The project tested DistilBERT on language data and Gradient Boosting to exploit tabular feature patterns.",
    tags: ["Python", "DistilBERT", "Gradient Boosting"]
  },
  {
    id: "doi-pin",
    category: "community",
    categoryLabel: "COMMUNITY",
    year: "GREEN LAB",
    title: "Đổi Pin Lấy Sen Đá",
    subtitle: "Community project with Green Lab",
    summary: "Encouraging battery recycling through a community exchange program.",
    description:
      "This community project collaborates with Green Lab to create collection points for used batteries and motivates participation through a battery-for-sen-da exchange program. The initiative aims to raise awareness about proper battery disposal and environmental responsibility.",
    tags: ["Green Lab", "Community", "Environment"]
  }
];

const contactEmail = "sonluvu666@gmail.com";
const projectsGrid = document.querySelector("#projects-grid");
const projectCount = document.querySelector("#project-count");
const filterButtons = document.querySelectorAll(".filter-button");
const dialog = document.querySelector("#project-dialog");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

function renderProjects(filter = "all") {
  const visibleProjects = projects.filter((project) => {
    return filter === "all" || project.category === filter;
  });

  projectCount.textContent = String(visibleProjects.length).padStart(2, "0");
  projectsGrid.innerHTML = visibleProjects.map((project) => `
    <button class="project-card" type="button" data-project-id="${project.id}" aria-haspopup="dialog">
      <span class="project-card-top">
        <span>${project.categoryLabel}</span>
        <span>${project.year}</span>
      </span>
      <span class="project-card-content">
        <span class="project-card-title">${project.title}</span>
        <span class="project-card-description">${project.summary}</span>
      </span>
      <span class="project-card-footer">
        <span class="project-tags">
          ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </span>
        <span class="project-open" aria-hidden="true">↗</span>
      </span>
    </button>
  `).join("");

  projectsGrid.querySelectorAll(".project-card-title").forEach((title) => {
    title.outerHTML = `<span class="project-card-title">${title.textContent}</span>`;
  });

  projectsGrid.querySelectorAll(".project-card-description").forEach((description) => {
    description.outerHTML = `<span class="project-card-description">${description.textContent}</span>`;
  });

  projectsGrid.querySelectorAll(".project-card").forEach((card) => {
    const title = card.querySelector(".project-card-title");
    const description = card.querySelector(".project-card-description");
    const content = document.createElement("span");
    content.className = "project-card-content";
    content.append(title, description);
    card.insertBefore(content, card.querySelector(".project-card-footer"));
  });
}

function openProject(projectId) {
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return;
  }

  document.querySelector("#dialog-category").textContent = project.categoryLabel;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-subtitle").textContent = project.subtitle;
  document.querySelector("#dialog-description").textContent = project.description;
  document.querySelector("#dialog-tags").innerHTML = project.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  dialog.showModal();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    renderProjects(button.dataset.filter);
  });
});

projectsGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project-id]");

  if (card) {
    openProject(card.dataset.projectId);
  }
});

document.querySelector(".dialog-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );

  document.querySelector("#form-status").textContent =
    "Opening your email app. If it does not open, please send directly via the email address below.";

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

renderProjects();