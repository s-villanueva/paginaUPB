document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.getElementById("mainmenu");
  const sidebar = document.getElementById("sidebar");
  const coursesContainer = document.getElementById("courses-container");

  // === ROUTES: same keys you already used ===
  const rutas = {
    microcontroladores: "microcontroladores.html",
    embebidos: "sistemas_embebidos.html",
    electronica2: "electro_aplicada_2.html",
    sis_sig: "signal_and_systems.html",
    senales: "procesamiento_senales.html",
    ing_control: "ing_control.html",
    ia: "ai.html",
    data_mining: "data_mining.html",
    robotics: "robotics.html",
    tel_network: "telematics_networks.html",
    adv_databases: "advanced_databases.html",
    topics_ai: "topics_ai.html",
    machine_learning: "machine_learning.html",
    deep_l: "deep_learning.html",
    comp_vis: "computer_vision.html",
    nat_lang_process: "nlp.html",
    big_data: "big_data.html",
    adv_ai_project: "advanced_ai_project.html",
    thesis_project: "thesis_project.html",
    simulacion: "simulation.html",
    logistica: "logistics.html",
    diseno_asistido: "cad.html",
    ingeniera_produccion: "production_engineering.html",
    comp_for_bio: "computing_bioengineering.html",
    bioinformatics_and_bigdata: "bioinformatics_big_data.html",
    ai_project: "ai_project.html",
    systems_project: "systems_project.html",
    electromec_project: "electromechanics_project.html",
    bio_project: "bioengineering_project.html",
    industrial_project: "industrial_project.html",
  };

  // === DATA MODEL: majors + their courses ===
  // Just edit this to add more majors/courses later
  const majors = [
    {
      id: "electromec",
      name: "Electromechanics Engineering",
      openByDefault: false,
      courses: [
        {
          id: "sis_sig",
          label: "Signals and Systems Analysis",
          icon: "functions",
        },
        {
          id: "senales",
          label: "Digital Signal Processing",
          icon: "settings_input_antenna",
        },
        {
          id: "ia",
          label: "Artificial Intelligence",
          icon: "psychology",
        },
        {
          id: "ing_control",
          label: "Control Engineering",
          icon: "settings",
        },
        {
          id: "electronica2",
          label: "Applied Electronics II",
          icon: "memory",
        },
      ],
    },
    {
      id: "ai_eng",
      name: "AI Engineering",
      openByDefault: false,
      courses: [
        {
          id: "data_mining",
          label: "Data Mining",
          icon: "analytics",
        },
        {
          id: "machine_learning",
          label: "Machine Learning I & II",
          icon: "timeline",
        },
        {
          id: "deep_l",
          label: "Deep Learning",
          icon: "hub",
        },
        {
          id: "comp_vis",
          label: "Computer Vision",
          icon: "visibility",
        },
        {
          id: "nat_lang_process",
          label: "Natural Language Processing",
          icon: "language",
        },
        {
          id: "robotics",
          label: "Robotics",
          icon: "precision_manufacturing",
        },
        {
          id: "big_data",
          label: "Big Data",
          icon: "storage",
        },
        {
          id: "adv_ai_project",
          label: "Advanced AI Project",
          icon: "assignment",
        },
      ]
    },
    {
      id: "sistem_comp",
      name: "Computer Systems Engineering",
      openByDefault: false,
      courses: [
        {
          id: "tel_network",
          label: "Telematics and Networks I",
          icon: "lan",
        },
        {
          id: "ia",
          label: "Artificial Intelligence",
          icon: "psychology",
        },
        {
          id: "adv_databases",
          label: "Advanced Databases",
          icon: "dns",
        },
        {
          id: "topics_ai",
          label: "Selected Topics in AI",
          icon: "auto_awesome",
        },
        {
          id: "robotics",
          label: "Robotics",
          icon: "smart_toy",
        },
        {
          id: "thesis_project",
          label: "Thesis Project",
          icon: "school",
        },
      ]
    },
    {
      id: "industrial",
      name: "Industrial Engineering",
      openByDefault: false,
      courses: [
        {
          id: "simulacion",
          label: "Simulation",
          icon: "science",
        },
        {
          id: "logistica",
          label: "Logistics",
          icon: "local_shipping",
        },
        {
          id: "diseno_asistido",
          label: "Computer-Assisted Design",
          icon: "architecture",
        },
        {
          id: "ingeniera_produccion",
          label: "Production Engineering",
          icon: "factory",
        }
      ]
    },
    {
      id: "bioing",
      name: "Bioengineering in natural resources",
      openByDefault: false,
      courses: [
        {
          id: "comp_for_bio",
          label: "Computation for Bioengineering",
          icon: "biotech",
        },
        {
          id: "bioinformatics_and_bigdata",
          label: "Bioinformatics and Big Data",
          icon: "insights",
        }
      ]
    }
  ];


  // === helper: build one course button with your existing animation ===
  function createCourseLink(course) {
    const a = document.createElement("a");
    a.href = "#";
    a.setAttribute("data-target", course.id);
    a.className =
      "relative flex items-center p-3 text-[#D6D6D6] rounded-lg overflow-hidden group";

    // sliding orange background
    const bg = document.createElement("span");
    bg.className =
      "absolute inset-0 bg-[#ff8107] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out";

    // icon
    const icon = document.createElement("span");
    icon.className = "material-icons mr-3 relative z-10";
    icon.textContent = course.icon || "menu_book";

    // label
    const label = document.createElement("span");
    label.className = "relative z-10";
    label.textContent = course.label;

    a.appendChild(bg);
    a.appendChild(icon);
    a.appendChild(label);

    return a;
  }

  // === render majors & their courses into the sidebar ===
  function renderSidebar() {
    coursesContainer.innerHTML = "";

    majors.forEach((major) => {
      const wrapper = document.createElement("div");

      // header (click to expand/collapse)
      const headerBtn = document.createElement("button");
      headerBtn.type = "button";
      headerBtn.setAttribute("data-major-toggle", major.id);
      headerBtn.className =
        "flex items-center justify-between w-full text-sm font-semibold text-[#D6D6D6] uppercase tracking-wide";

      const titleSpan = document.createElement("span");
      titleSpan.textContent = major.name;

      const chevron = document.createElement("span");
      chevron.className =
        "material-icons text-sm transition-transform duration-200";
      chevron.textContent = "expand_more";
      if (major.openByDefault) {
        chevron.classList.add("rotate-180");
      }

      headerBtn.appendChild(titleSpan);
      headerBtn.appendChild(chevron);

      // panel with courses
      const panel = document.createElement("div");
      panel.className = "mt-2 space-y-2";
      panel.setAttribute("data-major-panel", major.id);
      if (!major.openByDefault) {
        panel.classList.add("hidden");
      }

      major.courses.forEach((course) => {
        const link = createCourseLink(course);
        panel.appendChild(link);
      });

      wrapper.appendChild(headerBtn);
      wrapper.appendChild(panel);
      coursesContainer.appendChild(wrapper);
    });
  }

  renderSidebar();

  // === hook up course click behavior (iframe + active state) ===
  function setupCourseClicks() {
    const links = sidebar.querySelectorAll("a[data-target]");

    function clearActive() {
      links.forEach((l) => {
        l.classList.remove("bg-[#ff8107]", "text-white", "font-medium");
        l.classList.add("text-[#D6D6D6]");
      });
    }

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const destino = link.getAttribute("data-target");

        if (rutas[destino]) {
          iframe.src = rutas[destino];
        }

        clearActive();
        link.classList.add("bg-[#ff8107]", "text-white", "font-medium");
      });
    });
  }

  setupCourseClicks();

  // === hook up accordion behavior for majors ===
  function setupMajorToggles() {
    const toggles = sidebar.querySelectorAll("[data-major-toggle]");

    toggles.forEach((btn) => {
      btn.addEventListener("click", () => {
        const majorId = btn.getAttribute("data-major-toggle");
        const panel = sidebar.querySelector(
          `[data-major-panel="${majorId}"]`
        );
        const icon = btn.querySelector(".material-icons");

        if (!panel) return;

        panel.classList.toggle("hidden");
        if (icon) {
          icon.classList.toggle("rotate-180");
        }
      });
    });
  }

  setupMajorToggles();

  // === optional: if you have a mobile menu button with id="menu-btn" ===
  const menuBtn = document.getElementById("menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      // toggle sidebar visibility on mobile
      sidebar.classList.toggle("-translate-x-full");
    });
  }
});
