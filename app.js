const projects = [
  {
    id: "agri-yield",
    category: "ai",
    categoryLabel: "AI / MACHINE LEARNING",
    year: "2025",
    title: "AgriYield 2025",
    subtitle: "Maize Yield Prediction",
    summary: "Dự đoán năng suất ngô dựa trên dữ liệu nông nghiệp.",
    description:
      "Dự án khai thác dữ liệu nông nghiệp để xây dựng bài toán dự đoán năng suất ngô. Quy trình tập trung vào xử lý dữ liệu, lựa chọn đặc trưng và thử nghiệm các mô hình Machine Learning nhằm hỗ trợ phân tích mùa vụ.",
    tags: ["Python", "Machine Learning", "Data Science"]
  },
  {
    id: "fake-job",
    category: "ai",
    categoryLabel: "AI / MACHINE LEARNING",
    year: "PROJECT",
    title: "Fake Job Posting Prediction",
    subtitle: "Phân loại tin tuyển dụng giả",
    summary: "Kết hợp DistilBERT và Gradient Boosting để nhận diện tin tuyển dụng đáng ngờ.",
    description:
      "Bài toán phân loại tin tuyển dụng thật và giả, kết hợp đặc trưng văn bản với thông tin có cấu trúc. Dự án thử nghiệm DistilBERT cho dữ liệu ngôn ngữ và Gradient Boosting để khai thác các đặc trưng dạng bảng.",
    tags: ["Python", "DistilBERT", "Gradient Boosting"]
  },
  {
    id: "doi-pin",
    category: "community",
    categoryLabel: "CỘNG ĐỒNG",
    year: "GREEN LAB",
    title: "Đổi Pin Lấy Sen Đá",
    subtitle: "Dự án cộng đồng cùng Green Lab",
    summary: "Khuyến khích thu gom pin đã qua sử dụng thông qua hoạt động đổi quà.",
    description:
      "Dự án cộng đồng phối hợp cùng Green Lab, tạo điểm thu gom pin cũ và khuyến khích mọi người tham gia bằng hoạt động đổi pin lấy sen đá. Sáng kiến hướng tới nâng cao nhận thức về xử lý pin đúng cách.",
    tags: ["Green Lab", "Cộng đồng", "Môi trường"]
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
  menuToggle.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Mở menu");
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
    `Tên: ${name}\nEmail: ${email}\n\n${message}`
  );

  document.querySelector("#form-status").textContent =
    "Đang mở ứng dụng email. Nếu chưa được, hãy gửi trực tiếp qua email bên cạnh.";

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

renderProjects();