// DOM Elements
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

// Enhanced Mobile Navigation
function toggleNav() {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains("active")
    ? "hidden"
    : "";
}

function closeNav() {
  mobileMenu.classList.remove("active");
  navMenu.classList.remove("active");
  document.body.style.overflow = "";
}

// Event Listeners
mobileMenu.addEventListener("click", toggleNav);

// Close navigation when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeNav();
  }
});

// Enhanced Navigation Links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all links
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));

    // Add active class to clicked link
    link.classList.add("active");

    // Get target section
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Close mobile navigation
      closeNav();

      // Smooth scroll to section
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Enhanced Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      // Special animations for different sections
      if (entry.target.id === "keahlian") {
        setTimeout(() => animateSkillBars(), 500);
      }

      // Staggered animation for grid items
      if (entry.target.classList.contains("grid-item")) {
        entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
      }
    }
  });
}, observerOptions);

// Observe all animatable elements
const animatableElements = document.querySelectorAll(
  ".section-style, .timeline-item-new, .grid-item, .contact-item-new"
);

animatableElements.forEach((element) => {
  element.classList.add("fade-in");
  observer.observe(element);
});

// Enhanced Skill Bars Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-level-fill");

  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 200 + index * 100);
  });
}

// Enhanced Navbar Background Change
function updateNavbarBackground() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(36, 26, 36, 0.95)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background =
      "linear-gradient(135deg, #241a24 0%, #302530 100%)";
    navbar.style.backdropFilter = "blur(20px)";
  }
}

// Enhanced Typing Effect
function enhancedTypeWriter(element, text, speed = 80) {
  let i = 0;
  element.innerHTML = "";
  element.style.borderRight = "2px solid #e879f9";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed + Math.random() * 50);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.style.borderRight = "none";
      }, 1000);
    }
  }

  type();
}

// Initialize Enhanced Typing Effect
function initEnhancedTypingEffect() {
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      enhancedTypeWriter(heroTitle, originalText, 100);
    }, 1500);
  }
}

// Enhanced Parallax Effect
function addEnhancedParallaxEffect() {
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    if (hero && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Highlight Active Navigation on Scroll
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Enhanced Scroll to Top Button
function createEnhancedScrollToTopBtn() {
  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5,12 12,5 19,12"></polyline>
    </svg>
  `;
  scrollBtn.className = "scroll-to-top";
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f472b6 0%, #e879f9 50%, #c084fc 100%);
    color: white;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: 0 10px 30px rgba(232, 121, 249, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollBtn.addEventListener("mouseenter", () => {
    scrollBtn.style.transform = "scale(1.1) rotate(5deg)";
    scrollBtn.style.boxShadow = "0 15px 40px rgba(232, 121, 249, 0.6)";
  });

  scrollBtn.addEventListener("mouseleave", () => {
    scrollBtn.style.transform = "scale(1) rotate(0deg)";
    scrollBtn.style.boxShadow = "0 10px 30px rgba(232, 121, 249, 0.4)";
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
      scrollBtn.style.transform = "scale(1)";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
      scrollBtn.style.transform = "scale(0.8)";
    }
  });
}

// Mouse Trail Effect
function createMouseTrail() {
  const trail = [];
  const trailLength = 8;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div");
    dot.style.position = "fixed";
    dot.style.width = "4px";
    dot.style.height = "4px";
    dot.style.background = "#e879f9";
    dot.style.borderRadius = "50%";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "9998";
    dot.style.opacity = (i / trailLength).toString();
    dot.style.transition = "all 0.1s ease";
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let x = mouseX;
    let y = mouseY;

    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || trail[0];

      dot.style.left = x + "px";
      dot.style.top = y + "px";

      if (nextDot) {
        x += (parseFloat(nextDot.style.left) - x) * 0.3;
        y += (parseFloat(nextDot.style.top) - y) * 0.3;
      }
    });

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}

// Sparkle Animation
function createSparkles() {
  const sparkleContainer = document.createElement("div");
  sparkleContainer.style.position = "fixed";
  sparkleContainer.style.top = "0";
  sparkleContainer.style.left = "0";
  sparkleContainer.style.width = "100%";
  sparkleContainer.style.height = "100%";
  sparkleContainer.style.pointerEvents = "none";
  sparkleContainer.style.zIndex = "9999";
  document.body.appendChild(sparkleContainer);

  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 2 + "s";
    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 2000);
  }

  // Create sparkles periodically
  setInterval(createSparkle, 800);
}

// Enhanced Contact Item Ripple Effect
document.querySelectorAll(".contact-item-new").forEach((item) => {
  item.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(232, 121, 249, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Enhanced Loading Animation
function addLoadingAnimation() {
  const elements = document.querySelectorAll(
    "section, .nav-link, .hero-text, .profile-pic"
  );

  elements.forEach((element, index) => {
    element.classList.add("loading");
    element.style.animationDelay = `${index * 0.1}s`;
  });
}

// Optimized Scroll Handler with Throttle
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const throttledScrollHandler = throttle(() => {
  updateNavbarBackground();
  updateActiveNav();
}, 10);

// Initialize All Enhanced Functions
document.addEventListener("DOMContentLoaded", () => {
  // Add loading animation
  addLoadingAnimation();

  // Initialize enhanced effects
  addEnhancedParallaxEffect();
  initEnhancedTypingEffect();
  createEnhancedScrollToTopBtn();
  createSparkles();
  createMouseTrail();

  // Update active navigation
  updateActiveNav();

  // Initialize skill bars animation
  setTimeout(() => {
    const skillsSection = document.getElementById("keahlian");
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  }, 1000);

  // Initialize Feather icons
  if (typeof feather !== "undefined") {
    feather.replace();
  }

  // Smooth page load
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease-in-out";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Enhanced Window Load Event
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Staggered animation for hero elements
  setTimeout(() => {
    const heroElements = document.querySelectorAll(
      ".hero-text h1, .hero-subtitle, .hero-description, .cta-button"
    );
    heroElements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
        index * 0.2
      }s`;

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 100);
    });
  }, 500);

  // Initialize Feather icons again
  if (typeof feather !== "undefined") {
    feather.replace();
  }
});

// Add scroll event listener
window.addEventListener("scroll", throttledScrollHandler);

// Close nav when window is resized
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeNav();
  }
});

// Add interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effect to cards
  const cards = document.querySelectorAll(
    ".grid-item, .timeline-content-new, .skill-category-new, .contact-item-new"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Add floating animation to profile image
function addProfileFloating() {
  const profileImage = document.querySelector(".profile-pic");
  if (profileImage) {
    let floatDirection = 1;

    setInterval(() => {
      floatDirection *= -1;
      profileImage.style.transform += ` translateY(${floatDirection * 10}px)`;
    }, 3000);
  }
}

// Initialize profile floating
setTimeout(addProfileFloating, 2000);

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector(".footer-container p");
if (footerText) {
  footerText.innerHTML = footerText.innerHTML.replace("2025", currentYear);
}
