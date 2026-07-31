const serviceData = {
  cleaning: {
    heroTitle: "Professional cleaning teams for every space.",
    heroCopy:
      "Deep cleans, office care, post-construction cleanup, and scheduled maintenance handled by trained crews across Nairobi.",
    title: "Professional cleaning teams",
    copy:
      "Deep cleans, office care, post-construction cleanup, sofa and carpet cleaning, and scheduled maintenance handled by trained crews.",
    link: "#cleaning-services",
    linkText: "View cleaning options",
    service: "Cleaning service",
  },
  pest: {
    heroTitle: "Premium Pest Control & Cleaning Services.",
    heroCopy:
      "Safe, effective, and environmentally friendly pest control and professional cleaning services.",
    title: "Premium Pest Control & Cleaning Services",
    copy:
      "Safe, effective, and environmentally friendly pest control and professional cleaning services.",
    link: "#pest-services",
    linkText: "View pest options",
    service: "Pest control",
  },
};

const searchableServices = [
  { title: "Commercial & Office Cleaning", description: "Daily, weekly, or one-off cleaning for workspaces, retail, and shared facilities.", url: "services.html" },
  { title: "Residential Deep Cleaning", description: "Move-in, move-out, spring cleaning, kitchens, bathrooms, windows, and upholstery.", url: "services.html" },
  { title: "Post-Construction Cleanup", description: "Dust removal, floor care, glass detailing, debris handling, and final handover polish.", url: "services.html" },
  { title: "Carpet & Upholstery Cleaning", description: "Deep cleaning for carpets, sofas, mattresses, and fabric furniture using safe, effective methods.", url: "services.html" },
  { title: "Window & Glass Cleaning", description: "Streak-free window cleaning for homes, offices, and commercial buildings of all sizes.", url: "services.html" },
  { title: "Kitchen & Sanitation", description: "Thorough kitchen cleaning for restaurants, cafes, and food preparation areas meeting health standards.", url: "services.html" },
  { title: "Fumigation & Disinfection", description: "Targeted treatments for apartments, offices, warehouses, restaurants, and schools.", url: "services.html" },
  { title: "Termites, Bed Bugs & Roaches", description: "Inspection-led treatment plans for stubborn infestations and recurring pest pressure.", url: "services.html" },
  { title: "Rodent & Mosquito Control", description: "Sealing advice, baiting, fogging, monitoring, and prevention for safer properties.", url: "services.html" },
  { title: "Ant & Spider Control", description: "Effective elimination and prevention of ant colonies and spider infestations in and around properties.", url: "services.html" },
  { title: "Termite Inspection & Treatment", description: "Professional termite detection, soil treatment, and structural protection for homes and buildings.", url: "services.html" },
  { title: "Preventive Pest Programs", description: "Regular scheduled visits to maintain pest-free environments with monitoring and preventive treatments.", url: "services.html" },
];

const searchableBlogPosts = [
  { title: "10 Tips for Maintaining a Pest-Free Home", description: "Learn practical strategies to keep your home protected from common pests year-round.", url: "blog.html" },
  { title: "The Importance of Professional Office Cleaning", description: "How regular cleaning improves productivity and creates a healthier work environment.", url: "blog.html" },
  { title: "Seasonal Pest Control Guide for Nairobi", description: "What to expect each season and how to prepare your property against seasonal pests.", url: "blog.html" },
  { title: "Eco-Friendly Cleaning Solutions", description: "Discover green cleaning methods that are safe for your family and the environment.", url: "blog.html" },
  { title: "Signs You Need Professional Pest Control", description: "Recognize the warning signs that indicate it's time to call in the experts.", url: "blog.html" },
];

const whatsappNumber = "254700000000";

function setMode(mode) {
  const body = document.body;
  const tabs = document.querySelectorAll("[data-mode-target]");
  const title = document.querySelector("[data-service-title]");
  const copy = document.querySelector("[data-service-copy]");
  const heroTitle = document.querySelector("[data-hero-title]");
  const heroCopy = document.querySelector("[data-hero-copy]");
  const serviceLink = document.querySelector("[data-service-link]");
  const serviceSelect = document.querySelector('select[name="service"]');
  const cleaningGrid = document.querySelector("#cleaning-services");
  const pestGrid = document.querySelector("#pest-services");
  
  const selected = serviceData[mode] ? mode : "pest";
  body.dataset.mode = selected;
  
  if (title) title.textContent = serviceData[selected].title;
  if (copy) copy.textContent = serviceData[selected].copy;
  if (heroTitle) heroTitle.textContent = serviceData[selected].heroTitle;
  if (heroCopy) heroCopy.textContent = serviceData[selected].heroCopy;
  if (serviceLink) {
    serviceLink.href = serviceData[selected].link;
    serviceLink.firstChild.textContent = `${serviceData[selected].linkText} `;
  }
  if (serviceSelect) serviceSelect.value = serviceData[selected].service;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.modeTarget === selected;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  // Toggle service grid visibility
  if (cleaningGrid && pestGrid) {
    if (selected === "cleaning") {
      cleaningGrid.style.display = "grid";
      pestGrid.style.display = "none";
    } else {
      cleaningGrid.style.display = "none";
      pestGrid.style.display = "grid";
    }
  }
}

function init() {
  const tabs = document.querySelectorAll("[data-mode-target]");
  const chrome = document.querySelector(".site-chrome");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobilePanel = document.querySelector(".mobile-panel");
  const quoteForm = document.querySelector("#quote-form");
  const backToTop = document.querySelector(".back-to-top");
  const body = document.body;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setMode(tab.dataset.modeTarget));
  });

  window.addEventListener("scroll", () => {
    chrome.dataset.elevated = String(window.scrollY > 20);
    
    if (backToTop) {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = mobilePanel.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(quoteForm);
      const message = [
        "Hello Amaric Elite, I need a service quote.",
        `Name: ${formData.get("name")}`,
        `Phone: ${formData.get("phone")}`,
        `Service: ${formData.get("service")}`,
        `Location: ${formData.get("location")}`,
        `Message: ${formData.get("message")}`,
      ].join("\n");

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
    });
  }

  // Trust carousel animation
  const trustCarousel = document.querySelector(".trust-carousel");
  if (trustCarousel) {
    const trustItems = trustCarousel.querySelectorAll(".trust-item");
    let currentIndex = 0;

    function showNextTrustItem() {
      trustItems[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % trustItems.length;
      trustItems[currentIndex].classList.add("active");
    }

    setInterval(showNextTrustItem, 4000);
  }

  // Search modal functionality
  const searchToggle = document.querySelector(".search-toggle");
  const searchModal = document.querySelector("#searchModal");
  const searchClose = document.querySelector(".search-close");
  const searchOverlay = document.querySelector(".search-overlay");
  const searchInput = document.querySelector("#searchInput");
  const servicesResults = document.querySelector("#servicesResults");
  const blogResults = document.querySelector("#blogResults");

  function openSearchModal() {
    if (searchModal) {
      searchModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (searchInput) {
        searchInput.focus();
      }
    }
  }

  function closeSearchModal() {
    if (searchModal) {
      searchModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (searchInput) {
        searchInput.value = "";
        clearSearchResults();
      }
    }
  }

  function clearSearchResults() {
    if (servicesResults) {
      servicesResults.innerHTML = '<p class="no-results">No services found</p>';
    }
    if (blogResults) {
      blogResults.innerHTML = '<p class="no-results">No blog posts found</p>';
    }
  }

  function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
      clearSearchResults();
      return;
    }

    // Search services
    const matchingServices = searchableServices.filter(service =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm)
    );

    if (servicesResults) {
      if (matchingServices.length > 0) {
        servicesResults.innerHTML = matchingServices.map(service =>
          `<a href="${service.url}" class="search-result-item">
            <h4>${service.title}</h4>
            <p>${service.description}</p>
          </a>`
        ).join('');
      } else {
        servicesResults.innerHTML = '<p class="no-results">No services found</p>';
      }
    }

    // Search blog posts
    const matchingBlogPosts = searchableBlogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm)
    );

    if (blogResults) {
      if (matchingBlogPosts.length > 0) {
        blogResults.innerHTML = matchingBlogPosts.map(post =>
          `<a href="${post.url}" class="search-result-item">
            <h4>${post.title}</h4>
            <p>${post.description}</p>
          </a>`
        ).join('');
      } else {
        blogResults.innerHTML = '<p class="no-results">No blog posts found</p>';
      }
    }
  }

  if (searchToggle) {
    searchToggle.addEventListener("click", openSearchModal);
  }

  if (searchClose) {
    searchClose.addEventListener("click", closeSearchModal);
  }

  if (searchOverlay) {
    searchOverlay.addEventListener("click", closeSearchModal);
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSearchModal();
      }
    });
  }

  if (searchModal) {
    searchModal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeSearchModal();
      }
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (body.dataset.mode) {
    setMode(body.dataset.mode);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
